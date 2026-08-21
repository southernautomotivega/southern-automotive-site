"use client";
import { useEffect, useRef } from "react";

const STAGGER_STEP_MS = 70;

/**
 * Fades children in when they scroll into view. With `stagger`, each direct
 * child animates in sequence instead of the wrapper as a whole.
 *
 * Uses IntersectionObserver rather than a scroll-position library on purpose:
 * positions are re-evaluated by the browser as images and fonts settle, so a
 * late layout shift can't leave a section stranded at opacity 0.
 */
export default function Reveal({
  children,
  as: Tag = "div",
  className = "",
  stagger = false,
  delay = 0,
}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const baseDelay = delay * 1000;
    const timers = new Set();
    // Scoped to this effect run, not stored on the node: React remounts effects
    // (StrictMode does it on every mount) and cleanup cancels the timers, so a
    // flag that outlived the closure would make the retry skip its own work.
    const queued = new WeakSet();

    const paint = (node) => {
      // .is-revealed alone guarantees opacity:1. The keyframe rides on top and
      // is dropped on completion so its forwards-fill stops holding
      // `transform`, which the card hover states need back.
      node.classList.add("is-revealed", "is-revealing");

      const onEnd = (event) => {
        if (event.target !== node || event.animationName !== "revealIn") return;
        node.removeEventListener("animationend", onEnd);
        node.classList.remove("is-revealing");
      };
      node.addEventListener("animationend", onEnd);
    };

    const show = (node, index) => {
      if (node.classList.contains("is-revealed") || queued.has(node)) return;

      const wait = baseDelay + (stagger ? index * STAGGER_STEP_MS : 0);
      if (wait <= 0) {
        paint(node);
        return;
      }

      queued.add(node);
      const timer = setTimeout(() => {
        timers.delete(timer);
        queued.delete(node);
        paint(node);
      }, wait);
      timers.add(timer);
    };

    const showAll = () => {
      if (stagger) {
        Array.from(el.children).forEach(show);
      } else {
        show(el, 0);
      }
    };

    // A filtered grid swaps its children long after the reveal has run, and
    // the CSS hides every child by default — so late arrivals need showing too.
    let mutations;
    if (stagger && typeof MutationObserver !== "undefined") {
      mutations = new MutationObserver(() => {
        Array.from(el.children).forEach(show);
      });
      mutations.observe(el, { childList: true });
    }

    // Without IntersectionObserver, show everything rather than risk hiding it.
    if (typeof IntersectionObserver === "undefined") {
      showAll();
      return () => {
        mutations?.disconnect();
        timers.forEach(clearTimeout);
      };
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        showAll();
        observer.disconnect();
      },
      { rootMargin: "0px 0px -8% 0px" }
    );
    observer.observe(el);

    // Safety net. A backgrounded tab suppresses observer callbacks entirely,
    // so anything already on screen is revealed from its measured position
    // instead of waiting for a callback that may not arrive until focus.
    const revealIfOnScreen = () => {
      const rect = el.getBoundingClientRect();
      if (rect.top >= window.innerHeight || rect.bottom <= 0) return;
      showAll();
      observer.disconnect();
    };

    revealIfOnScreen();
    document.addEventListener("visibilitychange", revealIfOnScreen);

    return () => {
      document.removeEventListener("visibilitychange", revealIfOnScreen);
      observer.disconnect();
      mutations?.disconnect();
      timers.forEach(clearTimeout);
    };
  }, [stagger, delay]);

  const marker = stagger ? { "data-reveal-stagger": "" } : { "data-reveal": "" };

  return (
    <Tag ref={ref} className={className} {...marker}>
      {children}
    </Tag>
  );
}

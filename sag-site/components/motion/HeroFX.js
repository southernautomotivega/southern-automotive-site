"use client";
import { useEffect, useRef } from "react";

/**
 * Scroll-tied drift for the hero's decorative background layers.
 *
 * Only [data-parallax] wrappers are touched — never text or controls — so this
 * can never affect whether hero content is readable. The hero's own entrance
 * animation is pure CSS (see [data-hero-item] in globals.css).
 */
export default function HeroFX({ children, className = "" }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const layers = Array.from(el.querySelectorAll("[data-parallax]"));
    if (!layers.length) return;

    let frame = 0;

    const update = () => {
      frame = 0;
      const scrolledPast = -el.getBoundingClientRect().top;
      layers.forEach((layer, i) => {
        layer.style.transform = `translate3d(0, ${scrolledPast * 0.06 * (i + 1)}px, 0)`;
      });
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

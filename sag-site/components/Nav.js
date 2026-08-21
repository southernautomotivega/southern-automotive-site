"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Phone, Menu, X } from "lucide-react";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/inventory", label: "Inventory" },
  { href: "/team", label: "Meet the Team" },
  { href: "/about", label: "About" },
  { href: "/testimonials", label: "Testimonials" },
  { href: "/contact", label: "Contact" },
];

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-30 border-b transition-all duration-300 ${
        scrolled
          ? "bg-navy900/85 backdrop-blur-md border-white/10 shadow-lg shadow-black/20"
          : "bg-navy900 border-white/5"
      }`}
    >
      <div
        className={`max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between transition-all duration-300 ${
          scrolled ? "py-2.5" : "py-3"
        }`}
      >
        <Link href="/" className="flex items-center gap-2 focus-ring">
          <span className="font-display text-white text-xl sm:text-3xl font-semibold tracking-wide">
            SOUTHERN <span className="text-brandOrange">AUTOMOTIVE GROUP</span>
          </span>
        </Link>
        <nav className="hidden xl:flex items-center gap-6 font-body">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="relative text-sm font-medium py-1 focus-ring transition-colors duration-200 hover:text-white"
              style={{ color: pathname === l.href ? "#fff" : "rgba(255,255,255,0.72)" }}
            >
              {l.label}
              <span
                className={`absolute -bottom-3 left-0 right-0 h-0.5 bg-brandOrange rounded-full origin-left transition-transform duration-300 ${
                  pathname === l.href ? "scale-x-100" : "scale-x-0"
                }`}
              />
            </Link>
          ))}
          <a
            href="tel:+17627997108"
            className="flex items-center gap-2 bg-brandOrange text-white text-sm font-semibold px-4 py-2 rounded-md hover:opacity-90 hover:shadow-glow transition focus-ring"
          >
            <Phone size={14} /> 762-799-7108
          </a>
        </nav>
        <button className="xl:hidden text-white focus-ring" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      <div
        className={`xl:hidden grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="px-4 pb-4 pt-1 flex flex-col gap-3 font-body">
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-sm font-medium transition-colors duration-200"
                style={{ color: pathname === l.href ? "#F0791A" : "rgba(255,255,255,0.85)" }}
              >
                {l.label}
              </Link>
            ))}
            <a href="tel:+17627997108" className="text-white text-sm font-semibold flex items-center gap-2">
              <Phone size={15} /> 762-799-7108
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}

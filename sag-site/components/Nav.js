"use client";
import { useState } from "react";
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

  return (
    <header className="sticky top-0 z-30 bg-navy900 border-b border-white/5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 focus-ring">
          <span className="font-display text-white text-lg sm:text-2xl font-semibold tracking-wide">
            SOUTHERN <span className="text-brandOrange">AUTOMOTIVE GROUP</span>
          </span>
        </Link>
        <nav className="hidden lg:flex items-center gap-7 font-body">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="relative text-sm font-medium py-1 focus-ring"
              style={{ color: pathname === l.href ? "#fff" : "rgba(255,255,255,0.72)" }}
            >
              {l.label}
              {pathname === l.href && (
                <span className="absolute -bottom-3 left-0 right-0 h-0.5 bg-brandOrange rounded-full" />
              )}
            </Link>
          ))}
          <a
            href="tel:+18284766673"
            className="flex items-center gap-2 bg-brandOrange text-white text-sm font-semibold px-4 py-2 rounded-md hover:opacity-90 transition focus-ring"
          >
            <Phone size={14} /> 828-476-6673
          </a>
        </nav>
        <button className="lg:hidden text-white focus-ring" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      {open && (
        <div className="lg:hidden px-4 pb-4 flex flex-col gap-3 font-body">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-sm font-medium"
              style={{ color: pathname === l.href ? "#F0791A" : "rgba(255,255,255,0.85)" }}
            >
              {l.label}
            </Link>
          ))}
          <a href="tel:+18284766673" className="text-white text-sm font-semibold flex items-center gap-2">
            <Phone size={15} /> 828-476-6673
          </a>
        </div>
      )}
    </header>
  );
}

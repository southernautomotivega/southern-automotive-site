import Link from "next/link";
import { ShieldCheck, Wallet, ClipboardCheck, Users, Phone, Star } from "lucide-react";
import Reveal from "@/components/motion/Reveal";

export function TrustStrip() {
  const items = [
    { label: "Multi-Point Vehicle Inspections", Icon: ShieldCheck },
    { label: "Transparent Pricing", Icon: Wallet },
    { label: "Flexable Financing Options", Icon: ClipboardCheck },
    { label: "Family Owned, Customer Focused", Icon: Users },
  ];
  return (
    <div className="bg-navy900">
      <Reveal as="div" stagger className="max-w-6xl mx-auto px-4 sm:px-6 py-5 grid grid-cols-2 sm:grid-cols-4 gap-4 font-body">
        {items.map(({ label, Icon }) => (
          <div key={label} className="flex items-center gap-2.5 group">
            <Icon size={17} color="#FDB813" className="transition-transform duration-300 group-hover:scale-110 shrink-0" />
            <span className="text-sm sm:text-base font-medium leading-tight text-[#D3D8E4]">{label}</span>
          </div>
        ))}
      </Reveal>
    </div>
  );
}

export function CTABanner({ title, subtitle, primaryLabel, primaryHref }) {
  return (
    <section className="py-12 bg-bg">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <Reveal className="relative overflow-hidden rounded-[14px] p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6 bg-gradient-to-br from-navy800 via-navy700 to-navy600 bg-[length:200%_200%] motion-safe:animate-gradientPan font-body">
          <div
            aria-hidden
            className="pointer-events-none absolute -top-1/2 -right-16 w-64 h-[200%] rotate-12 bg-white/5 blur-2xl"
          />
          <div className="relative z-10">
            <h3 className="font-display text-2xl font-semibold mb-1 text-white">{title}</h3>
            <p className="text-sm text-[#C9D0DE]">{subtitle}</p>
          </div>
          <div className="relative z-10 flex gap-3 flex-shrink-0">
            <Link
              href={primaryHref}
              className="text-white font-semibold px-5 py-3 rounded-lg transition-all duration-300 hover:opacity-90 hover:shadow-glow hover:-translate-y-0.5 focus-ring whitespace-nowrap bg-brandOrange"
            >
              {primaryLabel}
            </Link>
            <a
              href="tel:+17627997108"
              className="text-white font-semibold px-5 py-3 rounded-lg hover:bg-white/10 transition-all duration-300 hover:-translate-y-0.5 focus-ring whitespace-nowrap flex items-center gap-2 border border-white/30"
            >
              <Phone size={15} /> Call
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function SectionEyebrow({ children }) {
  return <p className="text-xs font-bold tracking-[0.14em] uppercase mb-2 text-brandOrange font-body">{children}</p>;
}

export function StarRow({ count = 5, size = 14 }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} size={size} fill="#F0791A" color="#F0791A" />
      ))}
    </div>
  );
}

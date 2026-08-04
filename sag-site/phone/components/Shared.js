import Link from "next/link";
import { ShieldCheck, Wallet, ClipboardCheck, Users, Phone, Star } from "lucide-react";
import { PHONE_TEL } from "@/lib/site";

export function TrustStrip() {
  const items = [
    { label: "Every vehicle inspected", Icon: ShieldCheck },
    { label: "Fair, marked pricing", Icon: Wallet },
    { label: "Local financing options", Icon: ClipboardCheck },
    { label: "Family owned & operated", Icon: Users },
  ];
  return (
    <div className="bg-navy900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-5 grid grid-cols-2 sm:grid-cols-4 gap-4 font-body">
        {items.map(({ label, Icon }) => (
          <div key={label} className="flex items-center gap-2.5">
            <Icon size={17} color="#FDB813" />
            <span className="text-xs sm:text-sm font-medium leading-tight text-[#D3D8E4]">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function CTABanner({ title, subtitle, primaryLabel, primaryHref }) {
  return (
    <section className="py-12 bg-bg">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="rounded-[14px] p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6 bg-gradient-to-br from-navy800 to-navy600 font-body">
          <div>
            <h3 className="font-display text-2xl font-semibold mb-1 text-white">{title}</h3>
            <p className="text-sm text-[#C9D0DE]">{subtitle}</p>
          </div>
          <div className="flex gap-3 flex-shrink-0">
            <Link
              href={primaryHref}
              className="text-white font-semibold px-5 py-3 rounded-lg hover:opacity-90 transition focus-ring whitespace-nowrap bg-brandOrange"
            >
              {primaryLabel}
            </Link>
            <a
              href={`tel:${PHONE_TEL}`}
              className="text-white font-semibold px-5 py-3 rounded-lg hover:bg-white/10 transition focus-ring whitespace-nowrap flex items-center gap-2 border border-white/30"
            >
              <Phone size={15} /> Call
            </a>
          </div>
        </div>
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

import Image from "next/image";
import Link from "next/link";
import { TrustStrip, CTABanner, SectionEyebrow, StarRow } from "@/components/Shared";
import InventoryClient from "@/components/InventoryClient";
import { getVehicles } from "@/lib/vehicles";
import HeroSearch from "@/components/HeroSearch";

const TESTIMONIALS = [
  { name: "Michael R.", quote: "Probably the easiest car-buying experience I've had. No pressure, no runaround, and everything was explained clearly. I'll definitely be back when it's time for another vehicle.", rating: 5 },
  { name: "Sarah T.", quote: "You can tell they genuinely care about the people they work with. I felt comfortable from the moment I walked in and never felt pressured into anything. Great people and a great experience.", rating: 5 },
  { name: "Daniel C.", quote: "Southern Automotive Group made the whole process simple and straightforward. The vehicle was exactly as described, the pricing was fair, and I was treated with respect from start to finish.", rating: 5 },
];

const STEPS = [
  { step: "01", title: "Browse or ask", body: "Filter the lot yourself, or tell us what you need and we'll point you to the right fit." },
  { step: "02", title: "See real numbers", body: "Get an out-the-door price and a payment estimate before you ever drive over." },
  { step: "03", title: "Drive away", body: "Sign, get your keys, and go — most deals close same-day once financing is set." },
];

export default async function HomePage() {
  const vehicles = await getVehicles();

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-b from-navy800 via-navy700 to-navy600">
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 pt-12 pb-16 sm:pt-16 sm:pb-20 font-body">
          <Image src="/logo.png" alt="Southern Automotive Group" width={560} height={265} className="h-16 sm:h-20 w-auto mb-6" priority />
          <p className="text-sm font-semibold tracking-widest uppercase mb-3 text-brandGold">Clayton, Georgia · Rabun County</p>
          <h1 className="font-display text-4xl sm:text-6xl font-semibold leading-tight max-w-2xl text-white">
            Vehicles worth owning, and people worth trusting.
          </h1>
          <p className="mt-4 text-base sm:text-lg max-w-xl text-[#C9D0DE]">
            Owner-operated, no games, no markup surprises — just solid vehicles, inspected and
            priced fair, backed by people who&apos;ll answer the phone.
          </p>
          <HeroSearch />
        </div>
      </section>

      <TrustStrip />

      <CTABanner
        title="Ready to find your next vehicle?"
        subtitle="Browse what's on the lot right now, or call and we'll help you find the right fit."
        primaryLabel="Browse Inventory"
        primaryHref="/inventory"
      />

      <section className="py-16 bg-bg">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <InventoryClient vehicles={vehicles} full={false} />
        </div>
      </section>

      <section className="py-16 bg-bg">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 font-body">
          <SectionEyebrow>The process</SectionEyebrow>
          <h2 className="font-display text-3xl font-semibold mb-10 text-navy900">How buying here works</h2>
          <div className="grid sm:grid-cols-3 gap-8">
            {STEPS.map((s) => (
              <div key={s.step} className="flex flex-col gap-2">
                <span className="font-display text-3xl font-semibold text-brandOrange">{s.step}</span>
                <h3 className="font-display text-lg font-semibold text-navy900">{s.title}</h3>
                <p className="text-sm leading-relaxed text-muted">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-navy900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 font-body">
          <div className="flex items-center justify-between mb-8">
            <div>
              <SectionEyebrow>Word around town</SectionEyebrow>
              <h2 className="font-display text-3xl font-semibold text-white">What customers say</h2>
            </div>
            <Link href="/testimonials" className="text-sm font-semibold flex items-center gap-1 focus-ring whitespace-nowrap text-brandGold">
              See all →
            </Link>
          </div>
          <div className="grid sm:grid-cols-3 gap-5">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="rounded-[10px] p-5 flex flex-col gap-3 bg-navy700">
                <StarRow count={t.rating} />
                <p className="text-sm leading-relaxed text-[#C9D0DE]">&quot;{t.quote}&quot;</p>
                <span className="text-sm font-semibold text-brandGold">— {t.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner
        title="Got a trade-in, or just have questions?"
        subtitle="We'll give you a straight answer — no pressure, no pushy sales calls."
        primaryLabel="Contact Us"
        primaryHref="/contact"
      />
    </>
  );
}

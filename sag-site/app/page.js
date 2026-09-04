import Image from "next/image";
import Link from "next/link";
import { TrustStrip, CTABanner, SectionEyebrow, StarRow } from "@/components/Shared";
import InventoryClient from "@/components/InventoryClient";
import { getVehicles } from "@/lib/vehicles";
import HeroSearch from "@/components/HeroSearch";
import HeroFX from "@/components/motion/HeroFX";
import Reveal from "@/components/motion/Reveal";

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
        <HeroFX className="relative">
          {/* The parallax wrapper owns `transform` for scroll drift; the inner
              orb owns it for the float keyframe. Same element can't do both. */}
          <div aria-hidden data-parallax className="pointer-events-none absolute -top-24 -right-24">
            <div className="w-[420px] h-[420px] rounded-full bg-brandOrange/20 blur-[110px] motion-safe:animate-float" />
          </div>
          <div aria-hidden data-parallax className="pointer-events-none absolute -bottom-32 -left-16">
            <div className="w-[360px] h-[360px] rounded-full bg-brandGold/10 blur-[100px] motion-safe:animate-floatSlow" />
          </div>
          <div aria-hidden className="pointer-events-none absolute inset-0 bg-grain mix-blend-overlay opacity-60" />

          <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 pt-16 pb-16 sm:pt-20 sm:pb-20 font-body">
           <div className="max-w-2xl">
            <Image
              data-hero-item
              style={{ animationDelay: "0ms" }}
              src="/logo.png"
              alt="Southern Automotive Group"
              width={560}
              height={265}
              className="h-14 sm:h-16 w-auto mb-5"
              priority
            />
            <p data-hero-item
              style={{ animationDelay: "80ms" }} className="text-sm font-semibold tracking-widest uppercase mb-3 text-brandGold">
              Clayton, Georgia · Rabun County
            </p>
            <h1
              data-hero-item
              style={{ animationDelay: "160ms" }}
              className="font-display text-4xl sm:text-5xl xl:text-6xl font-semibold leading-[1.08] text-white"
            >
              Vehicles worth owning, and people worth trusting.
            </h1>
            <p data-hero-item
              style={{ animationDelay: "240ms" }} className="mt-4 text-base sm:text-lg max-w-xl text-[#C9D0DE]">
              Owner-operated, no games, no markup surprises — solid vehicles, inspected,
              priced fair, backed by people who answer the phone.
            </p>
            <div data-hero-item
              style={{ animationDelay: "320ms" }}>
              <HeroSearch />
            </div>
           </div>
          </div>

          <div
            aria-hidden
            className="relative z-10 hidden sm:flex justify-center pb-6 motion-safe:animate-bounce text-white/40"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 5v14M5 12l7 7 7-7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </HeroFX>
      </section>

      <TrustStrip />

      <section className="pt-16 pb-14 bg-bg">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {/* InventoryClient reveals its own header and grid — wrapping it in
              another Reveal would fade the same cards twice. */}
          <InventoryClient vehicles={vehicles} full={false} />
        </div>
      </section>

      <section className="pt-2 pb-16 bg-bg">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 font-body">
          <Reveal>
            <SectionEyebrow>The process</SectionEyebrow>
            <h2 className="font-display text-3xl font-semibold mb-10 text-navy900">How buying here works</h2>
          </Reveal>
          <Reveal as="div" stagger className="grid sm:grid-cols-3 gap-5">
            {STEPS.map((s) => (
              <div
                key={s.step}
                className="group relative flex flex-col gap-2 p-6 rounded-xl bg-white border border-borderTan transition-all duration-300 hover:-translate-y-1 hover:shadow-cardHover hover:border-brandOrange/40"
              >
                <span className="w-9 h-9 rounded-lg flex items-center justify-center bg-brandOrange/10 text-brandOrange font-display text-base font-semibold transition-colors duration-300 group-hover:bg-brandOrange group-hover:text-white">
                  {s.step}
                </span>
                <h3 className="font-display text-lg font-semibold text-navy900 mt-1">{s.title}</h3>
                <p className="text-sm leading-relaxed text-muted">{s.body}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="py-16 bg-navy900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 font-body">
          <Reveal className="flex items-center justify-between mb-8">
            <div>
              <SectionEyebrow>Word around town</SectionEyebrow>
              <h2 className="font-display text-3xl font-semibold text-white">What customers say</h2>
            </div>
            <Link href="/testimonials" className="text-sm font-semibold flex items-center gap-1 focus-ring whitespace-nowrap text-brandGold">
              See all →
            </Link>
          </Reveal>
          <Reveal as="div" stagger className="grid sm:grid-cols-3 gap-5">
            {TESTIMONIALS.map((t, i) => (
              <div
                key={i}
                className="rounded-[10px] p-5 flex flex-col gap-3 bg-navy700 transition-all duration-300 hover:-translate-y-1 hover:shadow-glow"
              >
                <StarRow count={t.rating} />
                <p className="text-sm leading-relaxed text-[#C9D0DE]">&quot;{t.quote}&quot;</p>
                <span className="text-sm font-semibold text-brandGold">— {t.name}</span>
              </div>
            ))}
          </Reveal>
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

import { SectionEyebrow, StarRow } from "@/components/Shared";
import Reveal from "@/components/motion/Reveal";

export const metadata = {
  title: "Testimonials | Southern Automotive Group",
};

const TESTIMONIALS = [
  { name: "Michael R.", quote: "Probably the easiest car-buying experience I've had. No pressure, no runaround, and everything was explained clearly. I'll definitely be back when it's time for another vehicle.", rating: 5 },
  { name: "Sarah T.", quote: "You can tell they genuinely care about the people they work with. I felt comfortable from the moment I walked in and never felt pressured into anything. Great people and a great experience.", rating: 5 },
  { name: "Daniel C.", quote: "Southern Automotive Group made the whole process simple and straightforward. The vehicle was exactly as described, the pricing was fair, and I was treated with respect from start to finish.", rating: 5 },
];

const REVIEW_URL = "https://www.google.com/maps/search/?api=1&query=Southern%20Automotive%20Group%20Clayton%20GA%20reviews";

export default function TestimonialsPage() {
  return (
    <section className="py-16 bg-bg font-body">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <Reveal>
          <SectionEyebrow>Reviews</SectionEyebrow>
          <h2 className="font-display text-3xl font-semibold mb-2 text-navy900">Testimonials</h2>
          <p className="text-sm mb-10 max-w-xl text-muted">
            What our customers are saying about buying from us.
          </p>
        </Reveal>
        <Reveal as="div" stagger className="grid sm:grid-cols-3 gap-5">
          {TESTIMONIALS.map((t, i) => (
            <div
              key={i}
              className="p-6 flex flex-col gap-3 rounded-[10px] shadow-card bg-white transition-all duration-300 hover:shadow-cardHover hover:-translate-y-1"
            >
              <StarRow count={t.rating} />
              <p className="text-base leading-relaxed text-navy900">&quot;{t.quote}&quot;</p>
              <span className="text-sm font-semibold text-brandOrange">— {t.name}</span>
            </div>
          ))}
        </Reveal>
        <Reveal className="mt-10 p-6 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-[10px] bg-navy900">
          <p className="text-sm text-white">Had a good experience? A quick Google review helps more than you&apos;d think.</p>
          <a
            href={REVIEW_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-all duration-300 hover:opacity-90 hover:shadow-glow hover:-translate-y-0.5 focus-ring whitespace-nowrap bg-brandOrange"
          >
            Leave a Review
          </a>
        </Reveal>
      </div>
    </section>
  );
}

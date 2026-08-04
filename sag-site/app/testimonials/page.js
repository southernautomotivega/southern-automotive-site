import { SectionEyebrow, StarRow } from "@/components/Shared";

export const metadata = {
  title: "Testimonials | Southern Automotive Group",
};

const TESTIMONIALS = [
  { name: "Sample Customer", quote: "Placeholder — swap in a real quote once your first reviews come in. Keep it short and specific to what they liked.", rating: 5 },
  { name: "Sample Customer", quote: "Placeholder testimonial. Real customer names and quotes build far more trust than generic copy.", rating: 5 },
  { name: "Sample Customer", quote: "Placeholder testimonial. Consider pulling your best Google or Facebook reviews here once you have them.", rating: 5 },
];

const REVIEW_URL = "https://www.google.com/maps/search/?api=1&query=Southern%20Automotive%20Group%20Clayton%20GA%20reviews";

export default function TestimonialsPage() {
  return (
    <section className="py-16 bg-bg font-body">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <SectionEyebrow>Reviews</SectionEyebrow>
        <h2 className="font-display text-3xl font-semibold mb-2 text-navy900">Testimonials</h2>
        <p className="text-sm mb-10 max-w-xl text-muted">
          Sample quotes below — replace with real customer reviews as they come in.
        </p>
        <div className="grid sm:grid-cols-3 gap-5">
          {TESTIMONIALS.map((t, i) => (
            <div key={i} className="p-6 flex flex-col gap-3 rounded-[10px] shadow-card bg-white">
              <StarRow count={t.rating} />
              <p className="text-base leading-relaxed text-navy900">&quot;{t.quote}&quot;</p>
              <span className="text-sm font-semibold text-brandOrange">— {t.name}</span>
            </div>
          ))}
        </div>
        <div className="mt-10 p-6 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-[10px] bg-navy900">
          <p className="text-sm text-white">Had a good experience? A quick Google review helps more than you&apos;d think.</p>
          <a
            href={REVIEW_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white text-sm font-semibold px-5 py-2.5 rounded-lg hover:opacity-90 transition focus-ring whitespace-nowrap bg-brandOrange"
          >
            Leave a Review
          </a>
        </div>
      </div>
    </section>
  );
}

import Link from "next/link";
import { Clock, MapPin, Phone } from "lucide-react";
import { SectionEyebrow } from "@/components/Shared";
import Reveal from "@/components/motion/Reveal";

export const metadata = {
  title: "About | Southern Automotive Group",
};

const FAQS = [
  { q: "Do you offer financing?", a: "Yes — we work with lenders who look at more than a national credit score. Reach out and we'll walk you through options." },
  { q: "Can I trade in my vehicle?", a: "Absolutely. Bring it by or send us details through the contact form and we'll get you a value." },
  { q: "Are your vehicles inspected?", a: "Every vehicle gets a mechanical check before it goes on the lot — not just a wash and a price tag." },
];

export default function AboutPage() {
  return (
    <>
      <section className="py-16 bg-navy900">
        <Reveal
          stagger
          className="max-w-6xl mx-auto px-4 sm:px-6 grid sm:grid-cols-3 gap-10 items-start font-body"
        >
          <div className="sm:col-span-2">
            <SectionEyebrow>About us</SectionEyebrow>
            <h2 className="font-display text-3xl font-semibold mb-4 text-white">Run by people who live here.</h2>
            <p className="leading-relaxed text-[#C9D0DE]">
              Southern Automotive Group is based right on Old Highway 441 in Clayton — no corporate
              office, no call center. If you buy a truck from us and something&apos;s not right,
              you&apos;ll have the same people on the phone that sold it to you. We built this
              business on the idea that a used car lot should treat neighbors like neighbors:
              vehicles worth owning, and people worth trusting.
            </p>
          </div>
          <div className="flex flex-col gap-4 text-sm text-[#C9D0DE]">
            <div className="flex items-center gap-3"><Clock size={18} color="#FDB813" /><span>Mon–Fri 9am–6pm · Sat 9am–3pm</span></div>
            <div className="flex items-start gap-3"><MapPin size={18} color="#FDB813" className="mt-0.5" /><span>1109 Old Highway 441 S, Clayton, GA 30525</span></div>
            <div className="flex items-center gap-3"><Phone size={18} color="#FDB813" /><span>762-799-7108</span></div>
            <a
              href="https://www.google.com/maps/search/?api=1&query=1109+Old+Highway+441+S%2C+Clayton%2C+GA+30525"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold underline w-fit text-brandGold"
            >
              Get Directions
            </a>
          </div>
        </Reveal>
      </section>

      <section className="py-16 bg-bg">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 font-body">
          <Reveal>
            <SectionEyebrow>FAQ</SectionEyebrow>
            <h2 className="font-display text-2xl font-semibold mb-6 text-navy900">Common questions</h2>
          </Reveal>
          <Reveal as="div" stagger className="flex flex-col divide-y divide-borderTan">
            {FAQS.map((f) => (
              <div key={f.q} className="py-5">
                <h3 className="font-semibold mb-1 text-navy900">{f.q}</h3>
                <p className="text-sm leading-relaxed text-muted">{f.a}</p>
              </div>
            ))}
          </Reveal>
          <Link
            href="/contact"
            className="mt-8 inline-flex items-center gap-2 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300 hover:opacity-90 hover:shadow-glow hover:-translate-y-0.5 focus-ring bg-brandOrange"
          >
            Ask us anything →
          </Link>
        </div>
      </section>
    </>
  );
}

import { Suspense } from "react";
import { Phone, MapPin, Clock } from "lucide-react";
import { Facebook, Instagram, Video } from "lucide-react";
import { SectionEyebrow } from "@/components/Shared";
import ContactForm from "@/components/ContactForm";
import { PHONE_DISPLAY } from "@/lib/site";

export const metadata = {
  title: "Contact | Southern Automotive Group",
};

const SOCIALS = [
  { name: "Facebook", url: "https://www.facebook.com/southernautomotivegroup", Icon: Facebook },
  { name: "Instagram", url: "https://www.instagram.com/southernautomotivegroup", Icon: Instagram },
  { name: "TikTok", url: "https://www.tiktok.com/@southernautomotivegroup", Icon: Video },
];

export default function ContactPage() {
  return (
    <section className="py-16 bg-bg font-body">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 grid sm:grid-cols-2 gap-10">
        <div>
          <SectionEyebrow>Reach out</SectionEyebrow>
          <h2 className="font-display text-3xl font-semibold mb-3 text-navy900">Get in touch</h2>
          <p className="text-sm leading-relaxed mb-6 text-muted">
            Send us your info and what you&apos;re looking for — trade-in, financing question, or
            a specific vehicle on the lot. We&apos;ll get back to you within one business day.
          </p>
          <div className="p-5 flex flex-col gap-3 text-sm mb-6 rounded-[10px] shadow-card bg-white text-navy900">
            <div className="flex items-center gap-3"><Phone size={16} className="text-brandOrange" /> {PHONE_DISPLAY}</div>
            <div className="flex items-start gap-3"><MapPin size={16} className="text-brandOrange mt-0.5" /> 1109 Old Highway 441 S, Clayton, GA 30525</div>
            <div className="flex items-center gap-3"><Clock size={16} className="text-brandOrange" /> Mon–Fri 9am–6pm · Sat 9am–3pm</div>
            <a
              href="https://www.google.com/maps/search/?api=1&query=1109+Old+Highway+441+S%2C+Clayton%2C+GA+30525"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold underline w-fit text-brandOrange"
            >
              Get Directions
            </a>
          </div>
          <div className="flex items-center gap-2.5">
            {SOCIALS.map(({ name, url, Icon }) => (
              <a
                key={name}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={name}
                className="w-9 h-9 rounded-full flex items-center justify-center bg-white border border-borderTan hover:opacity-75 transition focus-ring"
              >
                <Icon size={15} color="#101A30" />
              </a>
            ))}
          </div>
        </div>

        <div className="p-6 rounded-[10px] shadow-card bg-white">
          <Suspense fallback={<div className="text-sm text-muted">Loading form…</div>}>
            <ContactForm />
          </Suspense>
        </div>
      </div>
    </section>
  );
}

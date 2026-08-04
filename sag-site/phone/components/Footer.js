import Link from "next/link";
import { Facebook, Instagram, Video } from "lucide-react";
import { PHONE_DISPLAY } from "@/lib/site";

const SOCIALS = [
  { name: "Facebook", url: "https://www.facebook.com/southernautomotivegroup", Icon: Facebook },
  { name: "Instagram", url: "https://www.instagram.com/southernautomotivegroup", Icon: Instagram },
  { name: "TikTok", url: "https://www.tiktok.com/@southernautomotivegroup", Icon: Video },
];

export default function Footer() {
  return (
    <footer className="bg-navy900 py-10 font-body">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <Link href="/" className="font-display text-white text-sm font-semibold tracking-wide focus-ring">
            SOUTHERN <span className="text-brandOrange">AUTOMOTIVE GROUP</span>
          </Link>
          <div className="flex items-center gap-2.5">
            {SOCIALS.map(({ name, url, Icon }) => (
              <a
                key={name}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={name}
                className="w-9 h-9 rounded-full flex items-center justify-center bg-white/10 border border-white/20 hover:opacity-75 transition focus-ring"
              >
                <Icon size={15} color="#fff" />
              </a>
            ))}
          </div>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <p className="text-xs text-[#7C87A0]">
            © {new Date().getFullYear()} Southern Automotive Group of Georgia, LLC · 1109 Old Highway 441 S, Clayton, GA 30525
          </p>
          <p className="text-xs text-[#7C87A0]">{PHONE_DISPLAY}</p>
        </div>
      </div>
    </footer>
  );
}

"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

export default function HeroSearch() {
  const router = useRouter();
  const [q, setQ] = useState("");

  function goToInventory(params = {}) {
    const search = new URLSearchParams(params).toString();
    router.push(`/inventory${search ? `?${search}` : ""}`);
  }

  return (
    <div className="mt-8 max-w-xl rounded-xl p-3 bg-white/[0.08] border border-white/[0.16]">
      <div className="flex flex-col sm:flex-row gap-2">
        <div className="relative flex-1">
          <Search size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9AA3B8]" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && goToInventory({ q })}
            placeholder="Search a make, model, or 'truck under 25k'"
            className="w-full bg-white rounded-lg pl-9 pr-3 py-3 text-sm focus-ring"
          />
        </div>
        <button
          onClick={() => goToInventory({ q })}
          className="text-white font-semibold px-5 py-3 rounded-lg hover:opacity-90 transition focus-ring whitespace-nowrap bg-brandOrange"
        >
          Search Inventory
        </button>
      </div>
      <div className="flex flex-wrap gap-2 mt-3">
        {["Truck", "SUV", "Sedan"].map((t) => (
          <button
            key={t}
            onClick={() => goToInventory({ type: t })}
            className="text-xs font-medium px-3 py-1.5 rounded-full hover:bg-white/10 transition focus-ring text-[#E7EAF1] border border-white/25"
          >
            {t}s
          </button>
        ))}
        <a
          href="/contact"
          className="text-xs font-medium px-3 py-1.5 rounded-full hover:bg-white/10 transition focus-ring text-[#E7EAF1] border border-white/25"
        >
          Get Pre-Approved
        </a>
      </div>
    </div>
  );
}

"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Gauge, Settings, Fuel, Heart } from "lucide-react";
import { estimatePayment } from "@/lib/vehicles";

export default function VehicleCard({ v, saved, onToggleSave }) {
  const router = useRouter();
  const isSaved = saved.has(v.id);

  function goToDetail() {
    router.push(`/inventory/${v.id}`);
  }

  return (
    <div
      onClick={goToDetail}
      role="link"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === "Enter") goToDetail(); }}
      className="overflow-hidden flex flex-col rounded-[10px] shadow-card bg-white font-body cursor-pointer hover:shadow-lg hover:-translate-y-0.5 transition focus-ring"
    >
      <div className="flex items-center justify-center relative h-[150px] bg-gradient-to-br from-navy800 to-navy600 overflow-hidden">
        {v.image ? (
          <Image src={v.image} alt={`${v.year} ${v.make} ${v.model}`} fill className="object-cover" />
        ) : (
          <div className="flex flex-col items-center gap-2">
            <Image src="/logo.png" alt="Southern Automotive Group" width={280} height={132} className="h-10 w-auto opacity-90" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-brandGold">Photos Coming Soon</span>
          </div>
        )}
        <span className="absolute top-3 left-3 text-xs font-semibold px-2 py-1 rounded bg-[rgba(16,26,48,0.85)] text-brandGold">
          {v.type}
        </span>
        <button
          onClick={(e) => { e.stopPropagation(); onToggleSave(v.id); }}
          aria-label={isSaved ? "Remove from saved" : "Save vehicle"}
          className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center bg-[rgba(16,26,48,0.55)] hover:opacity-80 transition focus-ring"
        >
          <Heart size={15} color={isSaved ? "#F0791A" : "#fff"} fill={isSaved ? "#F0791A" : "none"} />
        </button>
      </div>
      <div className="p-4 flex flex-col gap-2.5 flex-1">
        <h3 className="font-display text-lg font-semibold leading-tight text-navy900">
          {v.year} {v.make} {v.model}
        </h3>
        <span className="text-xs text-muted font-medium">Stock #{v.stock}</span>
        <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted">
          <span className="flex items-center gap-1"><Gauge size={13} /> {v.miles.toLocaleString()} mi</span>
          {v.trans && <span className="flex items-center gap-1"><Settings size={13} /> {v.trans}</span>}
          {v.fuel && <span className="flex items-center gap-1"><Fuel size={13} /> {v.fuel}</span>}
        </div>
        <div className="pt-3 mt-1 flex items-end justify-between border-t border-borderTan">
          <div>
            <span className="font-display text-xl font-semibold block leading-none text-navy900">
              ${v.price.toLocaleString()}
            </span>
            <span className="text-xs text-muted">Est. ${estimatePayment(v.price).toLocaleString()}/mo*</span>
          </div>
          <button
            onClick={(e) => { e.stopPropagation(); goToDetail(); }}
            className="text-white text-xs font-semibold px-3 py-2 rounded-md hover:opacity-90 transition focus-ring whitespace-nowrap bg-brandOrange"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}

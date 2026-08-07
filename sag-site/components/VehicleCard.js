"use client";
import Image from "next/image";
import { Car, Gauge, Settings, Fuel, Heart } from "lucide-react";
import { estimatePayment } from "@/lib/vehicles";

export default function VehicleCard({ v, saved, onToggleSave, onSelect }) {
  const isSaved = saved.has(v.id);
  return (
    <div className="overflow-hidden flex flex-col rounded-[10px] shadow-card bg-white font-body">
      <div className="flex items-center justify-center relative h-[150px] bg-gradient-to-br from-navy800 to-navy600 overflow-hidden">
        {v.image ? (
          <Image src={v.image} alt={`${v.year} ${v.make} ${v.model}`} fill className="object-cover" />
        ) : (
          <Car size={46} color="#FDB813" strokeWidth={1.4} />
        )}
        <span className="absolute top-3 left-3 text-xs font-semibold px-2 py-1 rounded bg-[rgba(16,26,48,0.85)] text-brandGold">
          {v.type}
        </span>
        <button
          onClick={() => onToggleSave(v.id)}
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
          <span className="flex items-center gap-1"><Settings size={13} /> {v.trans}</span>
          <span className="flex items-center gap-1"><Fuel size={13} /> {v.fuel}</span>
        </div>
        <div className="pt-3 mt-1 flex items-end justify-between border-t border-borderTan">
          <div>
            <span className="font-display text-xl font-semibold block leading-none text-navy900">
              ${v.price.toLocaleString()}
            </span>
            <span className="text-xs text-muted">Est. ${estimatePayment(v.price).toLocaleString()}/mo*</span>
          </div>
          <button
            onClick={() => onSelect(v)}
            className="text-white text-xs font-semibold px-3 py-2 rounded-md hover:opacity-90 transition focus-ring whitespace-nowrap bg-brandOrange"
          >
            Check Availability
          </button>
        </div>
      </div>
    </div>
  );
}

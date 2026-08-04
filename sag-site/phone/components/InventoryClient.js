"use client";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Search, Gauge, Settings, Fuel, Car, CalendarCheck, Phone, X } from "lucide-react";
import VehicleCard from "./VehicleCard";
import { estimatePayment } from "@/lib/vehicles";
import { PHONE_TEL } from "@/lib/site";

const TYPES = ["All", "Truck", "SUV", "Sedan"];

export default function InventoryClient({ vehicles, full = false, initialQuery = "", initialType = "All" }) {
  const router = useRouter();
  const [query, setQuery] = useState(initialQuery);
  const [typeFilter, setTypeFilter] = useState(initialType);
  const [maxPrice, setMaxPrice] = useState(35000);
  const [sort, setSort] = useState("default");
  const [saved, setSaved] = useState(new Set());
  const [selected, setSelected] = useState(null);

  // Load saved vehicles from localStorage on mount (client-only)
  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem("savedVehicles") || "[]");
      setSaved(new Set(stored));
    } catch {
      // ignore malformed storage
    }
  }, []);

  function toggleSave(id) {
    setSaved((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      localStorage.setItem("savedVehicles", JSON.stringify([...next]));
      return next;
    });
  }

  const filtered = useMemo(() => {
    let list = vehicles.filter((v) => (typeFilter === "All" || v.type === typeFilter) && v.price <= maxPrice);
    if (query.trim()) {
      const q = query.trim().toLowerCase();
      list = list.filter((v) => `${v.year} ${v.make} ${v.model} ${v.type}`.toLowerCase().includes(q));
    }
    if (sort === "priceAsc") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "priceDesc") list = [...list].sort((a, b) => b.price - a.price);
    if (!full) list = list.slice(0, 4);
    return list;
  }, [vehicles, typeFilter, maxPrice, sort, query, full]);

  return (
    <div className="font-body">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">
        <div>
          <p className="text-xs font-bold tracking-[0.14em] uppercase mb-2 text-brandOrange">
            {full ? "Full lot" : "Just arrived"}
          </p>
          <h2 className="font-display text-3xl font-semibold text-navy900">
            {full ? "Current Inventory" : "Fresh on the Lot"}
          </h2>
          <p className="text-sm mt-1 text-muted">
            {full
              ? `${filtered.length} vehicle${filtered.length === 1 ? "" : "s"} match your search`
              : "Swap these placeholders for your real inventory feed when it's ready."}
          </p>
        </div>
        {!full && (
          <button
            onClick={() => router.push("/inventory")}
            className="text-sm font-semibold flex items-center gap-1 focus-ring whitespace-nowrap text-brandOrange"
          >
            View all inventory →
          </button>
        )}
      </div>

      {full && (
        <div className="p-4 flex flex-col gap-4 mb-8 rounded-[10px] bg-white border border-borderTan sticky top-[64px] z-10">
          <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
            <div className="relative flex-1 max-w-sm">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search year, make, or model"
                className="w-full border border-borderTan rounded-md pl-9 pr-3 py-2 text-sm focus-ring"
              />
            </div>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="border border-borderTan rounded-md px-3 py-2 text-sm focus-ring text-navy900"
            >
              <option value="default">Sort: Featured</option>
              <option value="priceAsc">Price: Low to High</option>
              <option value="priceDesc">Price: High to Low</option>
            </select>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex flex-wrap gap-2">
              {TYPES.map((t) => (
                <button
                  key={t}
                  onClick={() => setTypeFilter(t)}
                  className="text-sm font-medium px-3.5 py-1.5 rounded-full transition focus-ring"
                  style={{
                    background: typeFilter === t ? "#101A30" : "#fff",
                    color: typeFilter === t ? "#fff" : "#101A30",
                    border: `1px solid ${typeFilter === t ? "#101A30" : "#E9E2D2"}`,
                  }}
                >
                  {t}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2 flex-1 min-w-[180px]">
              <label className="text-xs font-medium whitespace-nowrap text-muted">
                Up to ${maxPrice.toLocaleString()}
              </label>
              <input
                type="range"
                min="15000"
                max="35000"
                step="1000"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="flex-1 focus-ring accent-brandOrange"
              />
            </div>
          </div>
        </div>
      )}

      {filtered.length === 0 ? (
        <div className="text-center py-16 text-muted">
          No vehicles match those filters right now. Try widening your search, or{" "}
          <a href="/contact" className="font-semibold underline text-brandOrange">tell us what you're after</a>.
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filtered.map((v) => (
            <VehicleCard key={v.id} v={v} saved={saved} onToggleSave={toggleSave} onSelect={setSelected} />
          ))}
        </div>
      )}

      {full && (
        <p className="text-xs mt-6 text-muted">
          *Payment estimates assume 9.9% APR over 60 months. Not a financing offer — actual terms depend on credit and lender approval.
        </p>
      )}

      {selected && (
        <div
          className="fixed inset-0 z-40 flex items-end sm:items-center justify-center p-0 sm:p-6 bg-[rgba(16,26,48,0.55)]"
          onClick={() => setSelected(null)}
        >
          <div
            className="w-full sm:max-w-lg sm:rounded-2xl rounded-t-2xl overflow-hidden max-h-[90vh] overflow-y-auto bg-white"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-center relative h-[160px] bg-gradient-to-br from-navy800 to-navy600">
              <Car size={56} color="#FDB813" strokeWidth={1.3} />
              <button
                onClick={() => setSelected(null)}
                aria-label="Close"
                className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center bg-[rgba(16,26,48,0.6)] focus-ring"
              >
                <X size={16} color="#fff" />
              </button>
            </div>
            <div className="p-6">
              <h3 className="font-display text-2xl font-semibold mb-1 text-navy900">
                {selected.year} {selected.make} {selected.model}
              </h3>
              <div className="flex items-baseline gap-3 mb-4">
                <span className="font-display text-xl font-semibold text-navy900">${selected.price.toLocaleString()}</span>
                <span className="text-sm text-muted">Est. ${estimatePayment(selected.price).toLocaleString()}/mo*</span>
              </div>
              <div className="grid grid-cols-2 gap-y-2 text-sm mb-6 text-muted">
                <span className="flex items-center gap-2"><Gauge size={14} /> {selected.miles.toLocaleString()} miles</span>
                <span className="flex items-center gap-2"><Settings size={14} /> {selected.trans}</span>
                <span className="flex items-center gap-2"><Fuel size={14} /> {selected.fuel}</span>
                <span className="flex items-center gap-2"><Car size={14} /> {selected.type}</span>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={`/contact?vehicle=${encodeURIComponent(`${selected.year} ${selected.make} ${selected.model}`)}`}
                  className="flex-1 text-white font-semibold px-5 py-3 rounded-lg hover:opacity-90 transition focus-ring flex items-center justify-center gap-2 bg-brandOrange"
                >
                  <CalendarCheck size={16} /> Ask About This Vehicle
                </a>
                <a
                  href={`tel:${PHONE_TEL}`}
                  className="flex-1 font-semibold px-5 py-3 rounded-lg hover:bg-black/5 transition focus-ring flex items-center justify-center gap-2 border border-borderTan text-navy900"
                >
                  <Phone size={15} /> Call Now
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

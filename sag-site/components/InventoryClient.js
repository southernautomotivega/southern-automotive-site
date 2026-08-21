"use client";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import VehicleCard from "./VehicleCard";
import Reveal from "@/components/motion/Reveal";

const TYPES = ["All", "Truck", "SUV", "Sedan"];

export default function InventoryClient({ vehicles, full = false, initialQuery = "", initialType = "All" }) {
  const router = useRouter();
  const [query, setQuery] = useState(initialQuery);
  const [typeFilter, setTypeFilter] = useState(initialType);
  const [maxPrice, setMaxPrice] = useState(35000);
  const [sort, setSort] = useState("default");
  const [saved, setSaved] = useState(new Set());

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
      list = list.filter((v) => `${v.year} ${v.make} ${v.model} ${v.type} ${v.stock}`.toLowerCase().includes(q));
    }
    if (sort === "priceAsc") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "priceDesc") list = [...list].sort((a, b) => b.price - a.price);
    if (!full) list = list.slice(0, 4);
    return list;
  }, [vehicles, typeFilter, maxPrice, sort, query, full]);

  return (
    <div className="font-body">
      <Reveal className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">
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
      </Reveal>

      {full && (
        <div className="p-4 flex flex-col gap-4 mb-8 rounded-[10px] bg-white border border-borderTan sticky top-[64px] z-10">
          <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
            <div className="relative flex-1 max-w-sm">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search year, make, model, or stock #"
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
        <Reveal as="div" stagger y={16} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filtered.map((v) => (
            <VehicleCard key={v.id} v={v} saved={saved} onToggleSave={toggleSave} />
          ))}
        </Reveal>
      )}

      {full && (
        <p className="text-xs mt-6 text-muted">
          *Payment estimates assume 9.9% APR over 60 months. Not a financing offer — actual terms depend on credit and lender approval.
        </p>
      )}
    </div>
  );
}

import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Gauge, Settings, Fuel, Car, CalendarCheck, Phone, ArrowLeft } from "lucide-react";
import { getVehicles, estimatePayment } from "@/lib/vehicles";

export async function generateMetadata({ params }) {
  const vehicles = await getVehicles();
  const v = vehicles.find((v) => v.id === Number(params.id));
  if (!v) return { title: "Vehicle Not Found | Southern Automotive Group" };
  return { title: `${v.year} ${v.make} ${v.model} | Southern Automotive Group` };
}

export default async function VehicleDetailPage({ params }) {
  const vehicles = await getVehicles();
  const v = vehicles.find((v) => v.id === Number(params.id));

  if (!v) notFound();

  return (
    <section className="py-10 bg-bg font-body">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <Link href="/inventory" className="inline-flex items-center gap-2 text-sm font-semibold text-brandOrange mb-6 focus-ring">
          <ArrowLeft size={15} /> Back to Inventory
        </Link>

        <div className="rounded-[10px] shadow-card bg-white overflow-hidden">
          <div className="relative h-[260px] sm:h-[360px] bg-gradient-to-br from-navy800 to-navy600 flex items-center justify-center overflow-hidden">
            {v.image ? (
              <Image src={v.image} alt={`${v.year} ${v.make} ${v.model}`} fill className="object-cover" priority />
            ) : (
              <div className="flex flex-col items-center gap-3">
                <Image src="/logo.png" alt="Southern Automotive Group" width={280} height={132} className="h-14 sm:h-16 w-auto opacity-90" />
                <span className="text-xs font-semibold uppercase tracking-[0.14em] text-brandGold">Photos Coming Soon</span>
              </div>
            )}
            <span className="absolute top-4 left-4 text-xs font-semibold px-2.5 py-1.5 rounded bg-[rgba(16,26,48,0.85)] text-brandGold">
              {v.type}
            </span>
          </div>

          <div className="p-6 sm:p-8">
            <h1 className="font-display text-3xl sm:text-4xl font-semibold text-navy900 mb-1">
              {v.year} {v.make} {v.model}
            </h1>
            <p className="text-sm text-muted font-medium mb-5">Stock #{v.stock}</p>

            <div className="flex items-baseline gap-4 mb-6">
              <span className="font-display text-3xl font-semibold text-navy900">${v.price.toLocaleString()}</span>
              <span className="text-sm text-muted">Est. ${estimatePayment(v.price).toLocaleString()}/mo*</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8 pb-8 border-b border-borderTan">
              <div>
                <p className="text-xs text-muted mb-1">Mileage</p>
                <p className="flex items-center gap-1.5 text-sm font-semibold text-navy900"><Gauge size={15} /> {v.miles.toLocaleString()} mi</p>
              </div>
              <div>
                <p className="text-xs text-muted mb-1">Transmission</p>
                <p className="flex items-center gap-1.5 text-sm font-semibold text-navy900"><Settings size={15} /> {v.trans}</p>
              </div>
              <div>
                <p className="text-xs text-muted mb-1">Fuel Type</p>
                <p className="flex items-center gap-1.5 text-sm font-semibold text-navy900"><Fuel size={15} /> {v.fuel}</p>
              </div>
              <div>
                <p className="text-xs text-muted mb-1">Body Style</p>
                <p className="flex items-center gap-1.5 text-sm font-semibold text-navy900"><Car size={15} /> {v.type}</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href={`/contact?vehicle=${encodeURIComponent(`${v.year} ${v.make} ${v.model} (Stock #${v.stock})`)}`}
                className="flex-1 text-white font-semibold px-5 py-3 rounded-lg hover:opacity-90 transition focus-ring flex items-center justify-center gap-2 bg-brandOrange"
              >
                <CalendarCheck size={16} /> Ask About This Vehicle
              </Link>
              <a
                href="tel:+18284766673"
                className="flex-1 font-semibold px-5 py-3 rounded-lg hover:bg-black/5 transition focus-ring flex items-center justify-center gap-2 border border-borderTan text-navy900"
              >
                <Phone size={15} /> Call Now
              </a>
            </div>

            <p className="text-xs text-muted mt-6">
              *Payment estimate assumes 9.9% APR over 60 months. Not a financing offer — actual terms depend on credit and lender approval.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

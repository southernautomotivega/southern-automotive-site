import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Gauge, Settings, Fuel, Car, CalendarCheck, Phone, ArrowLeft, Cog, Hash, ExternalLink, Disc } from "lucide-react";
import { getVehicles, estimatePayment } from "@/lib/vehicles";
import Reveal from "@/components/motion/Reveal";

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

        <Reveal className="rounded-[10px] shadow-card bg-white overflow-hidden">
          <div className="relative h-[260px] sm:h-[360px] bg-gradient-to-br from-navy800 to-navy600 flex items-center justify-center overflow-hidden">
            {v.image ? (
              <Image
                src={v.image}
                alt={`${v.year} ${v.make} ${v.model}`}
                fill
                sizes="(max-width: 896px) 100vw, 896px"
                className="object-cover"
                priority
              />
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

            <div className="rounded-[8px] border border-borderTan p-5 mb-8">
              <p className="text-xs font-bold tracking-[0.14em] uppercase mb-4 text-brandOrange">Vehicle Specifications</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div>
                  <p className="text-xs text-muted mb-1">Mileage</p>
                  <p className="flex items-center gap-1.5 text-sm font-semibold text-navy900"><Gauge size={15} /> {v.miles.toLocaleString()} mi</p>
                </div>
                {v.engine && (
                  <div>
                    <p className="text-xs text-muted mb-1">Engine</p>
                    <p className="flex items-center gap-1.5 text-sm font-semibold text-navy900"><Cog size={15} /> {v.engine}</p>
                  </div>
                )}
                {v.trans && (
                  <div>
                    <p className="text-xs text-muted mb-1">Transmission</p>
                    <p className="flex items-center gap-1.5 text-sm font-semibold text-navy900"><Settings size={15} /> {v.trans}</p>
                  </div>
                )}
                {v.drivetrain && (
                  <div>
                    <p className="text-xs text-muted mb-1">Drivetrain</p>
                    <p className="flex items-center gap-1.5 text-sm font-semibold text-navy900"><Disc size={15} /> {v.drivetrain}</p>
                  </div>
                )}
                {v.fuel && (
                  <div>
                    <p className="text-xs text-muted mb-1">Fuel Type</p>
                    <p className="flex items-center gap-1.5 text-sm font-semibold text-navy900"><Fuel size={15} /> {v.fuel}</p>
                  </div>
                )}
                <div>
                  <p className="text-xs text-muted mb-1">Body Style</p>
                  <p className="flex items-center gap-1.5 text-sm font-semibold text-navy900"><Car size={15} /> {v.type}</p>
                </div>
                <div className="col-span-2 sm:col-span-3">
                  <p className="text-xs text-muted mb-1">VIN</p>
                  <p className="flex items-center gap-1.5 text-sm font-semibold text-navy900"><Hash size={15} /> {v.vin}</p>
                </div>
              </div>
            </div>

            {v.carfaxUrl && (
              <a
                href={v.carfaxUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold text-brandOrange underline mb-8 focus-ring"
              >
                View Carfax Report <ExternalLink size={14} />
              </a>
            )}

            {v.description && (
              <div className="mb-8 pb-8 border-b border-borderTan">
                <p className="text-xs font-bold tracking-[0.14em] uppercase mb-2 text-brandOrange">Vehicle Description</p>
                <p className="text-sm leading-relaxed text-[#211F1A]">{v.description}</p>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href={`/contact?vehicle=${encodeURIComponent(`${v.year} ${v.make} ${v.model} (Stock #${v.stock})`)}`}
                className="flex-1 text-white font-semibold px-5 py-3 rounded-lg hover:opacity-90 transition focus-ring flex items-center justify-center gap-2 bg-brandOrange"
              >
                <CalendarCheck size={16} /> Ask About This Vehicle
              </Link>
              <a
                href="tel:+17627997108"
                className="flex-1 font-semibold px-5 py-3 rounded-lg hover:bg-black/5 transition focus-ring flex items-center justify-center gap-2 border border-borderTan text-navy900"
              >
                <Phone size={15} /> Call Now
              </a>
            </div>

            <p className="text-xs text-muted mt-6">
              *Payment estimate assumes 9.9% APR over 60 months. Not a financing offer — actual terms depend on credit and lender approval.
            </p>

            <div className="mt-6 p-4 rounded-[8px] bg-[#F3EDE2]">
              <p className="text-xs font-bold uppercase tracking-wide text-navy900 mb-2">Dealer Disclaimer</p>
              <p className="text-xs leading-relaxed text-muted">
                All vehicle information, including pricing, mileage, and equipment, is believed to be accurate
                but is not guaranteed and is subject to change without notice. Please verify all vehicle details
                with a Southern Automotive Group representative prior to purchase. Prices do not include tax,
                tag, title, and applicable dealer fees. Photos may not reflect the actual vehicle&apos;s exact
                color, options, or condition. Financing and payment estimates shown are for illustrative
                purposes only and do not constitute an offer of credit; actual rates and terms depend on
                applicant creditworthiness and lender approval. Southern Automotive Group is not responsible
                for typographical errors in pricing or vehicle information.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

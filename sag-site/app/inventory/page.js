import InventoryClient from "@/components/InventoryClient";
import { getVehicles } from "@/lib/vehicles";

export const metadata = {
  title: "Inventory | Southern Automotive Group",
};

export default async function InventoryPage({ searchParams }) {
  const vehicles = await getVehicles();
  const initialQuery = searchParams?.q || "";
  const initialType = searchParams?.type || "All";

  return (
    <section className="py-10 bg-bg">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <InventoryClient vehicles={vehicles} full initialQuery={initialQuery} initialType={initialType} />
      </div>
    </section>
  );
}

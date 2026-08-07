// TEMPORARY DATA SOURCE
// --------------------------------------------------------------------------
// Right now this file just exports a hardcoded array. Once Frazer is set up
// and you have a feed URL or API key from either Frazer's Web Connector or
// Dealer Car Search's Frazer integration, replace getVehicles() below with a
// real fetch() call to that feed. Every page that shows inventory imports
// from THIS file, so that's the only place that needs to change.
// --------------------------------------------------------------------------

const VEHICLES = [
  { id: 1, stock: "SAG1001", year: 2019, make: "Ford", model: "F-150 XLT", price: 27995, miles: 58200, type: "Truck", trans: "Automatic", fuel: "Gas", engine: "3.5L V6" },
  { id: 2, stock: "SAG1002", year: 2020, make: "Toyota", model: "RAV4 XLE", price: 24450, miles: 41300, type: "SUV", trans: "Automatic", fuel: "Gas", engine: "2.5L 4-Cylinder" },
  { id: 3, stock: "SAG1003", year: 2018, make: "Chevrolet", model: "Silverado 1500", price: 25995, miles: 71900, type: "Truck", trans: "Automatic", fuel: "Gas", engine: "5.3L V8" },
  { id: 4, stock: "SAG1004", year: 2021, make: "Honda", model: "Accord Sport", price: 21900, miles: 33500, type: "Sedan", trans: "Automatic", fuel: "Gas", engine: "1.5L Turbo 4-Cylinder" },
  { id: 5, stock: "SAG1005", year: 2017, make: "Jeep", model: "Wrangler Unlimited", price: 26500, miles: 62100, type: "SUV", trans: "Manual", fuel: "Gas", engine: "3.6L V6" },
  { id: 6, stock: "SAG1006", year: 2019, make: "GMC", model: "Sierra 1500 SLE", price: 28995, miles: 49700, type: "Truck", trans: "Automatic", fuel: "Gas", engine: "5.3L V8" },
  { id: 7, stock: "SAG1007", year: 2020, make: "Subaru", model: "Outback Premium", price: 23400, miles: 38900, type: "SUV", trans: "Automatic", fuel: "Gas", engine: "2.5L 4-Cylinder" },
  { id: 8, stock: "SAG1008", year: 2018, make: "Nissan", model: "Altima SV", price: 16995, miles: 54200, type: "Sedan", trans: "Automatic", fuel: "Gas", engine: "2.5L 4-Cylinder" },
  { id: 9, stock: "SAG1009", year: 2024, make: "Jeep", model: "Grand Cherokee 4xe", price: 26995, miles: 46322, type: "SUV", trans: "Automatic", fuel: "Hybrid", engine: "2.0L Turbo Plug-In Hybrid", image: "/vehicles/jeep-grand-cherokee-4xe.jpg", description: "One-owner trade-in, garage kept. Recent oil change and tire rotation performed in-house before listing. Clean Carfax, no accidents reported. Plug-in hybrid drivetrain gets great mileage around town — ask us about the tax incentives that may still apply." },
];

// Swap this function's body for a real fetch() once you have a feed URL, e.g.:
//
// export async function getVehicles() {
//   const res = await fetch(process.env.FRAZER_FEED_URL, { next: { revalidate: 300 } });
//   const data = await res.json();
//   return data.vehicles.map(v => ({ ...v, /* map Frazer's field names to ours if needed */ }));
// }
//
// `revalidate: 300` tells Next.js to re-check the feed every 5 minutes and
// rebuild automatically — that's "instant enough" for a car lot without
// needing a live database.
export async function getVehicles() {
  return VEHICLES;
}

export function estimatePayment(price, rate = 0.099, months = 60) {
  const r = rate / 12;
  return Math.round((price * r) / (1 - Math.pow(1 + r, -months)));
}

// Same pattern for staff — swap for a CMS (Airtable, Sanity, etc.) fetch
// once you want to edit this without touching code.
const TEAM = [
  { id: 1, name: "Nathan", role: "Co-Owner", initials: "N", bio: "Runs day-to-day sales and inventory sourcing. Every vehicle gets a mechanical once-over from Nathan before it goes on the lot." },
  { id: 2, name: "Paul D. Burns", role: "Co-Owner", initials: "PB", bio: "Nathan's partner and mentor in building the dealership from the ground up, focused on the business side and long-term direction." },
];

export async function getTeam() {
  return TEAM;
}

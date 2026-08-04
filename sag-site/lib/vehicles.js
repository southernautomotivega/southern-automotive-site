// TEMPORARY DATA SOURCE
// --------------------------------------------------------------------------
// Right now this file just exports a hardcoded array. Once Frazer is set up
// and you have a feed URL or API key from either Frazer's Web Connector or
// Dealer Car Search's Frazer integration, replace getVehicles() below with a
// real fetch() call to that feed. Every page that shows inventory imports
// from THIS file, so that's the only place that needs to change.
// --------------------------------------------------------------------------

const VEHICLES = [
  { id: 1, year: 2019, make: "Ford", model: "F-150 XLT", price: 27995, miles: 58200, type: "Truck", trans: "Automatic", fuel: "Gas" },
  { id: 2, year: 2020, make: "Toyota", model: "RAV4 XLE", price: 24450, miles: 41300, type: "SUV", trans: "Automatic", fuel: "Gas" },
  { id: 3, year: 2018, make: "Chevrolet", model: "Silverado 1500", price: 25995, miles: 71900, type: "Truck", trans: "Automatic", fuel: "Gas" },
  { id: 4, year: 2021, make: "Honda", model: "Accord Sport", price: 21900, miles: 33500, type: "Sedan", trans: "Automatic", fuel: "Gas" },
  { id: 5, year: 2017, make: "Jeep", model: "Wrangler Unlimited", price: 26500, miles: 62100, type: "SUV", trans: "Manual", fuel: "Gas" },
  { id: 6, year: 2019, make: "GMC", model: "Sierra 1500 SLE", price: 28995, miles: 49700, type: "Truck", trans: "Automatic", fuel: "Gas" },
  { id: 7, year: 2020, make: "Subaru", model: "Outback Premium", price: 23400, miles: 38900, type: "SUV", trans: "Automatic", fuel: "Gas" },
  { id: 8, year: 2018, make: "Nissan", model: "Altima SV", price: 16995, miles: 54200, type: "Sedan", trans: "Automatic", fuel: "Gas" },
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

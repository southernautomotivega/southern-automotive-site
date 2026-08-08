// TEMPORARY DATA SOURCE
// --------------------------------------------------------------------------
// Right now this file exports a hardcoded array. Once Frazer is set up and
// you have a feed URL or API key from either Frazer's Web Connector or
// Dealer Car Search's Frazer integration, replace the body of getVehicles()
// below with a real fetch() call to that feed. Every page that shows
// inventory imports from THIS file, so that's the only place that changes.
//
// AUTOMATIC VIN DECODING (works right now, no Frazer needed):
// As long as a vehicle has a real 17-character `vin`, these fields fill
// themselves in automatically from a free, no-signup government VIN
// database — you never have to type them by hand:
//   engine, drivetrain, trans (transmission), fuel
// If you DO type one of those fields in manually below, your value always
// wins over the auto-decoded one. So the only fields you ever truly need to
// type for a new vehicle are: id, stock, vin, year, make, model, price,
// miles, and type (body style — Truck/SUV/Sedan, used for the filters).
// Everything else is optional (image, description, carfaxUrl) or automatic.
// --------------------------------------------------------------------------

const VEHICLES = [
  { id: 1, stock: "SAG1001", vin: "1FTEW1EP0KFA00001", year: 2019, make: "Ford", model: "F-150 XLT", price: 27995, miles: 58200, type: "Truck" },
  { id: 2, stock: "SAG1002", vin: "2T3P1RFV0LC000002", year: 2020, make: "Toyota", model: "RAV4 XLE", price: 24450, miles: 41300, type: "SUV" },
  { id: 3, stock: "SAG1003", vin: "3GCUKREC0JG000003", year: 2018, make: "Chevrolet", model: "Silverado 1500", price: 25995, miles: 71900, type: "Truck" },
  { id: 4, stock: "SAG1004", vin: "1HGCV1F30MA000004", year: 2021, make: "Honda", model: "Accord Sport", price: 21900, miles: 33500, type: "Sedan" },
  { id: 5, stock: "SAG1005", vin: "1C4HJXDG0HW000005", year: 2017, make: "Jeep", model: "Wrangler Unlimited", price: 26500, miles: 62100, type: "SUV" },
  { id: 6, stock: "SAG1006", vin: "3GTU2NEC0KG000006", year: 2019, make: "GMC", model: "Sierra 1500 SLE", price: 28995, miles: 49700, type: "Truck" },
  { id: 7, stock: "SAG1007", vin: "4S4BTANC0L3000007", year: 2020, make: "Subaru", model: "Outback Premium", price: 23400, miles: 38900, type: "SUV" },
  { id: 8, stock: "SAG1008", vin: "1N4BL4BV0JC000008", year: 2018, make: "Nissan", model: "Altima SV", price: 16995, miles: 54200, type: "Sedan" },
  { id: 9, stock: "SAG1009", vin: "1C4RJKBG0RC000009", year: 2024, make: "Jeep", model: "Grand Cherokee 4xe", price: 26995, miles: 46322, type: "SUV", image: "/vehicles/jeep-grand-cherokee-4xe.jpg" },
];

// NOTE: the sample VINs above are placeholders (not real vehicles), so the
// auto-decode below may come back blank or slightly odd for them — that's
// expected and will resolve itself once real VINs are entered.

const DRIVE_TYPE_MAP = {
  "4WD/4-Wheel Drive/4x4": "4WD",
  "AWD/All-Wheel Drive": "AWD",
  "FWD/Front-Wheel Drive": "FWD",
  "RWD/Rear-Wheel Drive": "RWD",
};

async function decodeVin(vin) {
  if (!vin || vin.replace(/[^A-Za-z0-9]/g, "").length !== 17) return {};
  try {
    const res = await fetch(
      `https://vpic.nhtsa.dot.gov/api/vehicles/decodevinvalues/${vin}?format=json`,
      { next: { revalidate: 86400 } } // cache a day — factory specs never change
    );
    if (!res.ok) return {};
    const data = await res.json();
    const r = data?.Results?.[0];
    if (!r) return {};

    const engineParts = [];
    if (r.DisplacementL) engineParts.push(`${parseFloat(r.DisplacementL).toFixed(1)}L`);
    if (r.EngineCylinders) engineParts.push(`${r.EngineCylinders}-Cylinder`);
    const engine = engineParts.length ? engineParts.join(" ") : undefined;

    return {
      engine,
      drivetrain: DRIVE_TYPE_MAP[r.DriveType] || (r.DriveType || undefined),
      trans: r.TransmissionStyle || undefined,
      fuel: r.FuelTypePrimary || undefined,
    };
  } catch {
    return {}; // NHTSA hiccup or bad VIN — fields just stay hidden, site keeps working
  }
}

// Swap this function's body for a real fetch() once you have a Frazer feed
// URL, e.g.:
//
// export async function getVehicles() {
//   const res = await fetch(process.env.FRAZER_FEED_URL, { next: { revalidate: 300 } });
//   const data = await res.json();
//   const list = data.vehicles.map(v => ({ ...v, /* map Frazer's field names to ours if needed */ }));
//   return Promise.all(list.map(async (v) => ({ ...(await decodeVin(v.vin)), ...v })));
// }
export async function getVehicles() {
  return Promise.all(
    VEHICLES.map(async (v) => ({ ...(await decodeVin(v.vin)), ...v }))
  );
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

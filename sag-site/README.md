# Southern Automotive Group — Website

This is a real Next.js website: separate pages for Home, Inventory, Meet the
Team, About, Testimonials, and Contact. It's built to scale past 50 vehicles
and to plug into a live Frazer feed later without a redesign.

## 1. Get this code onto GitHub (no command line needed)

1. Go to github.com and create a free account if you haven't already.
2. Click the **+** in the top right → **New repository**.
3. Name it something like `southern-automotive-site`, keep it **Private** or
   **Public** (your choice — private is fine and free), don't check any of
   the "initialize with" boxes, then click **Create repository**.
4. On the next screen, look for **"uploading an existing file"** (a link in
   the setup instructions).
5. Unzip the file I gave you on your computer first. Then drag **all the
   files and folders inside it** (not the zip itself) into that GitHub
   upload page.
6. Scroll down and click **Commit changes**.

## 2. Deploy it on Vercel

1. Go to vercel.com and sign up using **"Continue with GitHub"** — this
   connects the two automatically.
2. Click **Add New → Project**, and select the repository you just created.
3. Leave all the settings on default (Vercel detects Next.js automatically)
   and click **Deploy**.
4. In a minute or two you'll get a working link like
   `southern-automotive-site.vercel.app`. Click it and check everything.

## 3. Point your GoDaddy domain at it

1. In Vercel: open your project → **Settings → Domains** → type your domain
   and click **Add**.
2. Vercel will show you DNS records to add (usually an **A record** for the
   root domain and a **CNAME** for `www`).
3. In GoDaddy: go to **My Products → your domain → DNS** (or "Manage DNS")
   and add exactly what Vercel showed you.
4. Wait 15 minutes to a few hours for it to take effect. Vercel issues free
   SSL (the padlock) automatically once it sees the domain pointed at it.

## 4. Turn on the contact form (2 minutes, no code)

The contact form is wired to use a free service called Formspree so
messages land straight in your inbox — no server, no database.

1. Go to formspree.io and sign up free.
2. Create a new form, and it'll give you a URL like
   `https://formspree.io/f/abc12345`.
3. Open `components/ContactForm.js` in GitHub (click the file, then the
   pencil/edit icon), find this line near the top:
   ```
   const FORMSPREE_ENDPOINT = "https://formspree.io/f/YOUR_FORM_ID";
   ```
   and replace `YOUR_FORM_ID` with your real form ID, then commit the change.
4. Vercel automatically redeploys the site whenever you save a change on
   GitHub — that's the whole workflow going forward.

## 5. Updating inventory and team, day to day

Right now, vehicles live in `lib/vehicles.js` as a plain list, and the same
file has a `getTeam()` function for staff. To add/remove a vehicle or a team
member by hand:

1. Open `lib/vehicles.js` on GitHub, click the pencil icon to edit.
2. Add or remove an entry in the list (copy the format of an existing one).
3. Commit the change — Vercel redeploys automatically within a minute.

**This is the part that gets replaced once Frazer is set up.** Inside
`lib/vehicles.js`, the `getVehicles()` function is intentionally isolated —
that's the one spot that changes to pull from Frazer's Web Connector feed or
the Dealer Car Search API instead of the hardcoded list. Everything else
(every page, every filter, the payment calculator) already reads through
that one function, so nothing else needs to change when that happens. Send
me the feed URL or API docs once you have Frazer access and I'll wire it up.

## What's already built in

- Real separate pages/URLs for Home, Inventory, Team, About, Testimonials,
  Contact — good for SEO and easy to link individually (e.g. in a text or a
  Facebook post).
- Inventory search, type filters, price slider, and sort — scales cleanly
  past 50 vehicles.
- Monthly payment estimator on every vehicle card (labeled clearly as an
  estimate, not a financing offer).
- "Save vehicle" heart icon that remembers a visitor's saved vehicles
  between visits.
- Mobile-friendly nav, hero search bar, and CTA banners.

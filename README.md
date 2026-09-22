# Parties by Tali

Elegant pastel marketing site for themed sleepover tent experiences.

## Develop

```bash
cd web
npm install
npm run dev
```

## Build

```bash
cd web
npm run build
npm run preview
```

## Hosting (Netlify)

The site deploys from this repo via Netlify (`netlify.toml`). Build command is `npm run build`; publish directory is `dist`.

Connect the GitHub repo in the Netlify dashboard (or with the Netlify CLI). After that, every push to `main` publishes automatically.

## Stripe Payment Links

1. Create a [Stripe](https://stripe.com) account and stay in **test mode** first.
2. Create products matching the packages in `src/data/packages.ts` (grand opening base):
   - Pretty in Pink — $200 (includes 3 tents)
   - Camp Slumberwood — $200 (includes 3 tents)
   - Let's Glow Crazy — $200 (includes 3 tents)
   - Game On — $200 (includes 3 tents)
   - Cozy Christmas — $200 (includes 3 tents)
   - Additional guests: $50 each up to 6 (collect after base checkout)
3. For each product, create a **Payment Link**.
4. Optional: set the “After payment” redirect to `https://YOUR-DOMAIN/#booked`.
5. Copy `.env.example` to `.env` and paste the Payment Link URLs.

Until `.env` is filled in, package buttons fall back to email booking so the site still works.

## Content & pricing

Edit theme copy and prices in [`src/data/packages.ts`](src/data/packages.ts). Keep Stripe product prices in sync when you change amounts.

## Images

Theme photos and logo live in `web/public/images/`. Replace files there anytime — keep the same filenames or update paths in the packages data file.

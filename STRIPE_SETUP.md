# Stripe Payment Links setup

Use this when you are ready to take online payments for Parties by Tali packages.

## 1. Create products (test mode first)

In the Stripe Dashboard:

| Product | Price |
|---------|-------|
| Pretty in Pink sleepover (grand opening base) | $200 |
| Camp Slumberwood sleepover (grand opening base) | $200 |
| Let's Glow Crazy sleepover (grand opening base) | $200 |
| Game On sleepover (grand opening base) | $200 |
| Cozy Christmas sleepover (grand opening base) | $200 |

**Introductory Grand Opening Pricing:** $200 includes 3 tents; $50 per additional guest (up to 6). Includes tent, blow up mattress, bedding, accent pillows, black lights & fairy lights, bed trays, and name plates.

Suggested product description: Grand opening base includes 3 tents ($200). Additional guests arranged after checkout at $50 each (max 6).

## 2. Create Payment Links

For each product, create a Payment Link. Turn on payment methods you want (card, Apple Pay, Google Wallet).

Set **After payment → Redirect to website** to:

```
https://YOUR-LIVE-DOMAIN/#booked
```

(or `http://localhost:5173/#booked` while testing locally)

## 3. Add links to the site

Copy `.env.example` to `.env` in the `web` folder and fill in:

```
VITE_STRIPE_LINK_PRETTY_IN_PINK=https://buy.stripe.com/...
VITE_STRIPE_LINK_CAMP_SLUMBERWOOD=https://buy.stripe.com/...
VITE_STRIPE_LINK_GLOW_CRAZY=https://buy.stripe.com/...
VITE_STRIPE_LINK_GAME_ON=https://buy.stripe.com/...
VITE_STRIPE_LINK_COZY_CHRISTMAS=https://buy.stripe.com/...
```

Restart `npm run dev` after changing `.env`.

## 4. Go live

Switch Stripe to live mode, create matching live products/Payment Links, and update `.env` (or your host’s environment variables) with the live URLs. Never put Stripe secret keys in this frontend — Payment Link URLs are safe to expose.

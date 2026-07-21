# Paulos — Bar · Pizzeria · Grill

Marketing website for Paulos in Munxar, Gozo. Built with Next.js (App Router)
and TypeScript. See [project_specs.md](project_specs.md) for what the site does
and why it is built this way.

## Running it on your computer

```bash
npm install
npm run dev
```

Then open http://localhost:3000

## Checking it before you publish

```bash
npm run build
```

This has to finish without errors. If it fails, the site will fail to deploy too.

## Pages

| Page | Address |
|---|---|
| Home | `/` |
| Menu | `/menu` |
| About | `/about` |
| Gallery | `/gallery` |
| Location | `/location` |
| Reserve | `/booking` |

## Where things live

- `app/` — one folder per page
- `app/globals.css` — every style in the site, built on the Paulos design tokens
- `components/` — reusable pieces (nav, footer, carousels, booking flow)
- `lib/menu.ts` — the menu items and prices; **edit this file to change the menu**
- `public/images/` — all photography

## Changing the menu

Open `lib/menu.ts`. Each dish looks like this:

```ts
{ name: "Margherita", price: "€7.00", desc: "Tomato sauce, mozzarella, oregano." }
```

Change the text, save, and the page updates. Add `star: true` to mark a house
favourite with a gold diamond.

## Bookings

There is **no booking backend yet**. The reserve page collects the details and
asks the guest to phone them through. Nothing is stored or emailed. See the
"Honesty constraints" section of `project_specs.md` before changing this.

## Deployment

Hosted on Vercel. Every push to the `main` branch publishes automatically.
There are no environment variables or secret keys — the site is fully static.

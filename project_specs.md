# Paulos — Bar · Pizzeria · Grill

## What the app does
A marketing website for Paulos, a family-run bar, pizzeria and grill in Munxar, Gozo (Malta). It shows people what the place is, what the food looks like, when it's open, and gets them to reserve a table or come in.

## Who uses it
Public visitors — locals and tourists looking for somewhere to eat. No login, no accounts, no user data.

## Where this lives
A **new standalone Next.js project** at `DRYNU WEBSITE UPDATED/paulos`, separate from the DRYNU studio site. Deployed to Vercel on its own.

---

## Tech Stack
- **Language:** TypeScript
- **Framework:** Next.js (App Router)
- **Styling:** Plain CSS using the Paulos Design System tokens (imported from the Claude Design project). No Tailwind — the design is token-driven CSS and porting it 1:1 keeps it faithful.
- **Fonts:** Playfair Display (hero), Cormorant Garamond (headings, nav, buttons), Inter (body) — loaded via `next/font/google`
- **Icons:** `lucide-react` (the design uses Lucide)
- **Database / Auth:** None. This is a static marketing site.
- **Deployment:** Vercel

---

## Pages

| Page | Route | Who can see it | Built now? |
|---|---|---|---|
| Landing page | `/` | Public | Yes |
| Menu | `/menu` | Public | Yes |
| About | `/about` | Public | Yes |
| Gallery | `/gallery` | Public | Yes |
| Location | `/location` | Public | Yes |
| Reserve | `/booking` | Public | Yes |

### Menu (`/menu`)
Full-screen photo header, then the complete menu with real prices, filterable by
category: All / Starters / Salads / Artisan Pizza / Signature Pizza / Burgers /
Wraps / Kids / Sides & Sauces. Two columns on desktop, one on mobile.

### About (`/about`)
Full-screen photo header, a centred statement, two alternating photo/text splits
("A family story", "Simple food, done well"), and a closing call to action.

### Gallery (`/gallery`)
Page header, category filter, masonry grid of photographs.

### Location (`/location`)
Page header, a live Google map beside the address and contact details, opening
hours table, and a gold "Reserve the night" call to action. The map is Google's
share-embed iframe centred on the restaurant, so visitors can drag and zoom it.
It needs no API key and no billing account, which keeps the site backend-free.

### Reserve (`/booking`)
Four-step reservation flow — party size → date & time → your details → confirmed —
with a live summary panel alongside.

---

## Landing page sections (in order)

1. **Nav** — logo, links (Home / Menu / About / Gallery / Location / Reserve), gold "Order" button that opens the Paulos page on Bolt Food in a new tab. Transparent over the hero, turns to blurred black once you scroll. Full-screen drawer on mobile, which carries its own copy of the Order button.
2. **Hero** — full-screen photo slideshow (5 images, cross-fades every 4.5s), "EST. 2020" eyebrow, headline "Good **Food.** Good **Times.**", gold "Reserve the night" button, opening hours pinned bottom-right, gold rule along the bottom.
3. **Marquee** — scrolling strip: Pizzeria ✦ Grill ✦ Homemade ✦ Signature Dishes ✦ Local Ingredients
4. **Menu feature panel** — split layout: photo on the left, solid gold panel on the right with "Looking for our menu?" and a link to the menu.
5. **Some of our Favourites** — three dish cards (BBQ Chicken, Whiskey Glaze Burger, Beefy Jack) with photos.
6. **Marquee (reverse)** — Monthly Specials ✦ Warm Atmosphere ✦ Freshly Prepared ✦ Food & Family
7. **Story** — "How it all began" text panel + photo, links to About.
8. **Reviews carousel** — 4 quotes, auto-advances every 4s, clickable dots.
9. **Gallery teaser** — six scattered photos behind a giant gold outlined "Gallery" word, button to the gallery page.
10. **Footer** — logo, address + phone, nav links, "Designed by Drynu", Instagram / Facebook / Google Maps icons.
11. **Back-to-top** — gold hexagon button, appears after scrolling.

---

## Data models and where data is stored
None. All content (menu items and prices, reviews, opening hours, address) is hard-coded in the page files. Nothing is saved, submitted or fetched.

---

## Third-party services
No Supabase, no Stripe, no analytics, no email service, no API keys. One embed: the **Google Maps** share-embed iframe on the location page (keyless, no billing). External links only otherwise: **Bolt Food** (the nav "Order" button — delivery and takeaway are handled entirely on Bolt's site), Instagram, Facebook, Google Maps, a `tel:` phone link, and a `mailto:` link to `paulosmunxar@gmail.com`.

---

## Reservations — how they actually reach the restaurant

**Decided 2026-07-22: the booking flow hands off to WhatsApp.**

The old ending was the problem. A guest filled in four steps and was then told
nothing had been sent and they had to phone and read it all back out. All the
effort, none of the result.

Now the last step opens WhatsApp with the whole reservation already written out,
addressed to **+356 7979 6149**. The guest taps send; Paulos replies to confirm.

**Why WhatsApp rather than a database or email**
- Nothing to run, nothing to pay for, no API keys, no accounts to keep alive.
  The site stays a static marketing site.
- The reply comes back on the same thread, so the guest can see it was confirmed
  by a human — which an auto-email cannot honestly claim.
- Adrian confirmed someone checks daily.
- It degrades well: WhatsApp Web covers desktop, and the phone number stays on
  the page for anyone who would rather call.

**What changes in the flow**
1. Party size — unchanged.
2. Date & time — unchanged.
3. Details — **email field removed** (nothing is emailed to the guest, so asking
   for it was dishonest). **Phone becomes optional**, because WhatsApp already
   shows the restaurant who is writing. Name stays required. **Window seating
   toggle removed** on 2026-07-22 — Paulos does not take seating requests.
4. Summary — becomes "Send on WhatsApp": the review ticket, one gold button that
   opens the prefilled chat, and a "call instead" fallback.

**Message format sent to the restaurant**
```
Hi Paulos, I'd like to book a table.

Name:     <name>
Party:    <n> guests
Date:     <Fri 25 Jul>
Time:     <19:30>
Occasion: <Dinner>
Notes:    <notes>
Phone:    <phone, if given>

Sent from paulos-pearl.vercel.app
```

## Honesty constraints that still apply
- Every time slot is shown as available. The design faked unavailability with a
  maths formula, which would turn real customers away for no reason.
- The flow asks for a table, it does not grant one. Wording stays "request"
  until Paulos replies on WhatsApp. No invented booking reference.
- Nothing claims an email was sent, because none is.
- No table availability or capacity checking. Every request is a request until
  the restaurant confirms it.

## What "done" looks like for this task
- [x] Finishing the flow opens WhatsApp at +356 7979 6149 with the reservation
      filled in and readable
- [x] Works on a phone (opens the app) and on desktop (opens WhatsApp Web) —
      `wa.me` handles both
- [x] Email field gone; name still required; phone optional
- [x] The page never says a table is booked
- [x] `npm run build` passes and the flow works end to end in the browser

---

## Images
Real photography pulled from the Claude Design project into `/public`:
- 1 hero background + 4 rotating hero photos
- 3 dish photos for Favourites
- 1 story photo, 1 menu-panel photo
- 6 gallery teaser photos
- Paulos logo (nav + footer)

All served through Next.js `<Image>` where it helps, plain `<img>` where the design relies on CSS blend modes (the logo uses `mix-blend-mode: screen`).

---

## File structure
```
paulos/
  app/
    layout.tsx          fonts, nav, footer, global CSS
    page.tsx            the landing page
    globals.css         design system tokens + Paulos site styles
    menu/page.tsx       stub
    about/page.tsx      stub
    gallery/page.tsx    stub
    location/page.tsx   stub
    booking/page.tsx    stub
  components/
    SiteNav.tsx         nav + mobile drawer + scroll state
    SiteFooter.tsx      footer
    HeroSlideshow.tsx   cross-fading hero images
    Marquee.tsx         scrolling text strip
    ReviewCarousel.tsx  quotes carousel
    Reveal.tsx          fade-up-on-scroll wrapper
    BackToTop.tsx       back-to-top button
    BrandIcons.tsx      Instagram / Facebook SVGs
    PageStub.tsx        shared "coming soon" page header
  public/
    images/             all photography
    logo.png
  project_specs.md
```

---

## Accessibility & behaviour notes
- All motion (marquees, reveals, slideshow) respects `prefers-reduced-motion`.
- Nav drawer is keyboard-closable and marks the current page.
- Hero images carry empty `alt` (decorative); content images get real alt text.

---

## What "Done" looks like
- [x] `npm run dev` starts with no console errors
- [x] `npm run build` passes with no TypeScript errors
- [x] Landing page matches the design at desktop width
- [x] Hero slideshow cross-fades; reviews carousel advances and dots work
- [x] Nav turns solid on scroll; mobile drawer opens and closes
- [x] All five stub pages load with working nav and footer
- [x] Responsive down to 375px wide — nothing overflows sideways
- [x] Reduced-motion setting stops the animations

## Deployment

**Phase 1 — publish (now).** The site is fully static with no secrets, so it
deploys as-is: GitHub repository → Vercel project → automatic build on every
push to `main`. Starting on the free `*.vercel.app` address; a custom domain can
be attached later without any code change.

## Phase 2 — database-backed bookings (SUPERSEDED, kept as a future option)

**Not being built.** The WhatsApp handoff decided on 2026-07-22 solves the same
problem with nothing to run and nothing to pay for. Revisit this only if Paulos
outgrows WhatsApp — say, if they want a searchable history of bookings or the
volume stops fitting in one chat thread.

Turns the reserve page from "phone this through" into an actual reservation.

**What gets added**
- `bookings` table in Supabase: id, name, phone, email, party_size, booking_date,
  booking_time, occasion, notes, window_seating, status, created_at.
- `POST /api/bookings` — validates the request, writes one row, sends two emails.
  Business logic lives in `lib/bookings.ts`; the route stays thin.
- Emails via Resend: one to `paulosmunxar@gmail.com` with the guest's details,
  one to the guest confirming the request.
- Spam protection on the endpoint, plus a rate limit, so the inbox cannot be
  flooded.

**Supabase rules that apply**
- RLS stays on. The `bookings` table gets **no** public read or write policy.
- The route uses the server-side client with the service role key, which never
  appears in client code and lives only in Vercel's environment variables.
- Guests never read bookings back; they only receive the email.

**Only switch it on when**
- Someone at Paulos has agreed to check that inbox daily. An unwatched booking
  system is worse than the phone number, because guests believe they have a table.
- Until then the page keeps saying the request is not confirmed.

**Still not built by Phase 2:** table availability and capacity limits. Every
request is a request until the restaurant confirms it, so the site must not
imply a slot is held.

## Notes from the build
- `lucide-react` v1 removed third-party brand marks, so the Instagram and
  Facebook icons are inlined in `components/BrandIcons.tsx`.
- The marquee renders its strip twice and animates to `-50%`, so the loop has
  no visible gap (the original design animated a single copy to `-100%`).
- Photography was sourced from the full-resolution originals in Downloads and
  resized into `public/images` (33 files, ~4.9 MB total).
- The gallery filters are All / Pizza / Burgers / The Kitchen. The design had
  Food / Grill / Room / Drinks / Nights across 15 frames, but there are still no
  photographs of the room, the drinks or guests — empty categories would have
  looked broken.
- The gallery holds **24 photographs** (7 pizza, 11 burgers, 6 kitchen), rebuilt
  on 2026-07-22 from Joel Gueller's "Paulos June 2026" set of 23 originals. The
  black-and-white oven shot (`gal-24.jpg`) is the one frame kept from the earlier
  batch, because it is not in that set. Originals are 4032×6048 and up; they are
  resized to a 1400px long edge at JPEG quality 82 (~4.3 MB for all 24).
- The booking step labels hide below 1150px wide. Four labels plus their markers
  do not fit in the step column below that, and were being clipped.

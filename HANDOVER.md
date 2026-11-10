# Handover: Spain & Portugal trip site redesign

Branch: `cursor/react-redesign-bd37` (based on `main`). No PR has been opened yet.

## The brief (short version)

Rebuild the static single-file site (now saved as `legacy-index.html`) as a React + TypeScript + Vite app. It should read like an editorial travel magazine and work like a polished product: mobile-first, accessible, interactive where that helps, and fast. Keep **all** original content, facts and links exactly as they are. Do not add facts, prices or photos. Deploy to GitHub Pages at `https://nidal312.github.io/spain-portugal-trip/` through GitHub Actions.

You're done when:

- `npm run build` and `npm run lint` pass with no errors.
- The site has been checked at 375px, 768px and 1280px.
- Screenshots at 375px and 1280px of the hero, map, a day, and the slots section are attached to the PR.
- All original content and links are present.
- A PR is open against `main`, and its description says the Pages source must be switched to "GitHub Actions".

## Current state

- `npm ci` works.
- `tsc` reports exactly one error: `src/main.tsx` imports `./App`, which does not exist yet.
- The finished parts haven't been seen in a browser yet, so they need a visual review.

## Stack and decisions

| Concern | Choice | Why |
| --- | --- | --- |
| Build | Vite 8, `@vitejs/plugin-react`, TS 6 (strict, `noUncheckedIndexedAccess`) | Required by the brief |
| Styling | Tailwind v4 via `@tailwindcss/vite`; tokens live in `@theme` in `src/styles.css` (there is no `tailwind.config`) | Tokens are defined once in CSS and become utilities like `bg-paper` and `text-terra` |
| Primitives | Radix packages (`react-dialog`, `react-tabs`, `react-toggle-group`, `react-collapsible`, `react-checkbox`), wrapped by hand in a shadcn-like style under `src/components/ui` | Accessible keyboard and ARIA behaviour without the shadcn CLI |
| Motion | `motion` (Framer Motion v12+, imported from `motion/react`) | Required by the brief |
| Carousel | `embla-carousel-react` is installed. You will probably also want `embla-carousel-auto-height` (not installed yet) | Swipeable day planner |
| Icons | `lucide-react` | — |
| Fonts | `@fontsource-variable/fraunces` (opsz axis, roman and italic) and `@fontsource-variable/instrument-sans`, self-hosted and imported in `src/main.tsx` | Editorial serif paired with a characterful sans; no third-party font requests |
| Images | `vite-imagetools`. Each photo is imported with `?w=480;800;1200&format=webp;jpg&as=picture`; the hero uses `640;960;1200`. Originals stay in `/img` and are reached through the `@img` alias | Responsive WebP with a JPEG fallback. The originals are 1200px wide, so nothing is upscaled |
| Lint | ESLint 9 flat config: typescript-eslint, react-hooks, react-refresh, jsx-a11y | ESLint 10 conflicts with the peer dependencies of `eslint-plugin-jsx-a11y` |
| Persistence | `src/lib/useLocalStorage.ts`: keys are prefixed `spain-portugal-trip:` and stay in sync across tabs | Checklist ticks, flight picks and slot confirmation codes |
| Rich text in data | `src/lib/rich.tsx`: `renderRich` and `<RichText>` handle `**bold**`, `*italic*`, `==highlight==` and `[label](url)`. Links render through `ExternalLink` (new tab, with screen-reader text) | Content stays as plain typed strings, and no raw HTML is injected |

Path aliases: `@/*` points to `src/*` and `@img/*` points to `img/*`. Both are set in `vite.config.ts` and `tsconfig.app.json`.

## File map

```
index.html                Vite entry (title and meta copied from the original)
legacy-index.html         The ORIGINAL site. It is the content source of truth: diff against it, then delete it before merging
img/                      Original Wikimedia photos plus credits.json (untouched)
vite.config.ts            base '/spain-portugal-trip/', react, tailwind, imagetools, aliases
eslint.config.js
tsconfig*.json
src/
  main.tsx                Font imports, styles, and rendering <App/> (App.tsx is MISSING)
  styles.css              Theme tokens, base styles, paper-grain overlay, .kicker, .prose-link, .stub, reduced-motion rules
  types/imagetools.d.ts   Module type for the `*&as=picture` imports
  lib/                    cn.ts, rich.tsx, useLocalStorage.ts
  state/
    contexts.ts           LightboxContext/useLightbox, TripContext/useTrip, scrollToId()
    TripProvider.tsx      Selected day index, goToDay(dayId) (selects the day and scrolls to #days), selected map city
  components/
    Lightbox.tsx          LightboxProvider: Radix Dialog, previous/next, arrow keys, credit caption
    ui/                   ExternalLink, Photo (<picture>), PhotoCredit, ZoomablePhoto (opens the lightbox),
                          Reveal (fade-up when scrolled into view), SectionHeading (index number, kicker, h2, lead),
                          Segmented (Radix ToggleGroup pill control with an animated thumb)
  data/                   ALL content, typed. Nothing is hard-coded in JSX
    photos.ts             16 photos: picture, size, alt, caption, artist, license, Commons URL, footer labels; creditOrder
    cities.ts             Barcelona, Valencia, Lisbon: dates, nights, map coordinates
    trip.ts               Hero copy, departure and return timestamps (for the countdown), About/footer text, navItems
    route.ts              Lead, three "why" cards, map labels and legend
    flights.ts            11 flights, 3 legs, default selection, intro, 4 Google Flights search links
    checklist.ts          6 booking items
    slots.ts              5 venues; per-time chips derived ONLY from the slot notes; fields; booking links
    days.ts               8 days (22–29). Blocks: time-of-day / intro / unverified callout
    spots.ts              6 Barcelona spots, headline price, links, linked slot; intro and Casa Vicens footnote
    food.ts               Halal food per city (with notes and sources) and mosques per city
    stay.ts               3 recommended bases
    weather.ts            Highs and lows, wet-day chance and label, sunrise/sunset, sources
  sections/
    Header.tsx            DONE
    Hero.tsx              DONE
    route/RouteMap.tsx    DONE
    route/RouteSection.tsx DONE
    FlightsSection.tsx    DONE
    ChecklistSection.tsx  DONE
```

## Design system

- **Type.** Display headings use Fraunces Variable (`font-display`, with `font-optical-sizing: auto`); italic Fraunces is the accent, e.g. the "&" and the section numbers. Body text uses Instrument Sans Variable (`font-sans`). Kickers use `.kicker`: 0.72rem, weight 600, 0.2em tracking, uppercase. Use `.tabular` for times and prices.
- **Palette** (tokens in `src/styles.css`):
  - Backgrounds and lines: `paper #f5eee1` (page), `paper-2 #fbf7ef` (cards), `sand #ece2cf`, `line #dccdb4`.
  - Text: `ink #1e1813`, `ink-soft #574b40` (muted text, about 7:1 contrast on paper).
  - Accents: `terra #b23f22` and `terra-deep`, `saffron #d79a34` (decorative or on dark backgrounds only) and `saffron-deep`, `sea #1c5866` (links), `azulejo #24508c` (focus ring and Lisbon), `olive #44563a` (recommended tags, highlights), `night #1b1a24`.
  - City accents: `city-barcelona` (terracotta), `city-valencia #b0620f`, `city-lisbon` (azulejo).
  - Availability: `avail-last #a12e19`, `avail-limited #8c520c`, `avail-good #2b5f3e`.
- **Surfaces.** Cards are `rounded-2xl` to `rounded-[1.75rem]`, with a `border-line bg-paper-2 shadow-card` (or `shadow-lift`) finish. Alternate section backgrounds: paper, then `bg-sand/60` (Flights), then dark `bg-ink` (Checklist). A subtle paper-grain SVG noise overlay sits on `body::before`. `.stub` masks ticket-stub notches into the card edges; set the position with `--notch-y`.
- **Layout.** Content width is `max-w-7xl px-5 sm:px-8`, with sections at `py-20 sm:py-28`. `SectionHeading` uses a 12-column grid: index number and kicker in 3 columns, h2 and lead in 9. Numbering so far: 01 Route, 02 Flights, 03 Book now. Continue it: 04 Slots, 05 Days, 06 Top spots, 07 Food, 08 Prayer, 09 Stay, 10 Weather.
- **Motion.**
  - Use the ease `[0.22, 1, 0.36, 1]`, 0.25–0.9s for UI and up to about 3.4s for the map path.
  - Use `Reveal` for scroll fade-ups (once only, small 18px offset), springs for pills and thumbs (`layoutId`), and `AnimatePresence` for swaps.
  - Reduced motion: wrap the app in `<MotionConfig reducedMotion="user">`; CSS also zeroes animations; the hero parallax and map animation check `useReducedMotion()`.
- **Accessibility.**
  - Global `:focus-visible` ring in azulejo.
  - Radix handles the ARIA for dialogs, toggles and checkboxes.
  - Icon-only buttons carry `sr-only` labels.
  - External links say "(opens in a new tab)".
  - `scroll-padding-top` (7.5rem on mobile, 5rem on desktop) is set on `html` for the sticky header.

## Done

1. **Content layer.** Every piece of content from `legacy-index.html` is transcribed into `src/data/*.ts`. Double-check it against the original anyway (see Known issues).
2. **Header.** Sticky and translucent with blur. The nav is a horizontally scrolling pill strip on mobile and inline on desktop. An IntersectionObserver scroll-spy drives an animated active pill, auto-scrolls the strip to it, and sets `aria-current`. A terracotta bar shows reading progress.
3. **Hero.** Full-bleed photo with gentle parallax (off under reduced motion) and a large Fraunces title with an italic saffron "&". It shows the kicker, a countdown pill computed from `trip.departure` (a derived value, not a new fact), the lead, and a frosted route strip (Barcelona, train, Valencia, plane, Lisbon, each with its nights pill). There's a "Start with the route" link, and the photo credit sits directly under the hero.
4. **Route.**
   - The SVG map reuses the original illustrated Iberia and Portugal paths, adds wavy sea hatching, and draws faint dotted arcs leaving the frame to stand for the Netherlands.
   - The train and flight paths draw on through masks once the map scrolls into view, and a traveller dot follows them using `getPointAtLength`.
   - City markers are real HTML `<button aria-pressed>` elements positioned in percentages over the SVG.
   - The city panel (`useTrip().city`) shows dates, nights, the stay base linking to `#stay`, and the city's days. Clicking a day calls `goToDay`.
   - The legend and the three "Why not Madrid / Why not Porto / The transfer trick" columns are in place.
5. **Flights.**
   - Three legs, each a `fieldset` of radio cards styled as ticket stubs: airline, recommended tag, big times, route and nonstop (shown only where the source says so), fare, a 05:00–24:00 time-of-day bar, and notes.
   - The return leg has an Eindhoven / Amsterdam / Both toggle that auto-selects the cheapest option in the chosen filter.
   - A sticky dark bar sums the picks ("Your combination €242 pp" by default). Picks are saved locally.
   - Search link chips are at the bottom.
6. **Book now checklist.** Dark section with six Radix checkboxes, a "Not booked"/"Booked" status pill, an animated progress ring, and a reset button. Ticks are saved locally.
7. **Shared pieces.** The lightbox, zoomable photo, photo credit, `Segmented`, `Reveal`, `SectionHeading` and `TripProvider` are built and ready to use.

## Remaining work (in priority order)

### 1. `src/App.tsx` (this blocks the build)

```tsx
<MotionConfig reducedMotion="user">
  <TripProvider>
    <LightboxProvider>
      <a href="#main" className="sr-only focus:not-sr-only ...">Skip to content</a>
      <Header />
      <main id="main">
        <Hero />
        <RouteSection />
        <FlightsSection />
        <ChecklistSection />
        <SlotsSection />
        <DaysSection />
        <SpotsSection />
        <FoodSection />
        <MosquesSection />
        <StaySection />
        <WeatherSection />
      </main>
      <Footer />
    </LightboxProvider>
  </TripProvider>
</MotionConfig>
```

Keep the original section order and anchor ids: `route`, `flights`, `book`, `slots`, `days`, `tickets`, `food`, `pray`, `stay`, `weather`. Export `App` as a named export, because `main.tsx` imports `{ App }`. Also add `@keyframes fade-in` (from opacity 0 to 1) to `styles.css`, since the lightbox overlay class refers to it.

### 2. `SlotsSection` (`#slots`, 04, kicker "Open slots"); data in `slots.ts`

- Put the "as of" line (`slotsIntro.asOf`) right under the title, styled as a timestamp.
- Filter with `Segmented`: All / Last few / Good, each with a count.
- Show one card per venue, each with `id={venue.id}` (for example `slot-sagrada`), so the Top spots cards can link to it.
  - The header has a small photo thumbnail, the venue name, `when`, and an availability badge in the `avail-*` colour with its label from `availabilityLabel`.
  - The **time-chip grid** has `gridCaption` above it. Each chip is coloured by availability. A suggested chip gets an olive outline and a "Suggested" marker, and a chip can show its `note` (for example "3 left", "€37", "€30").
  - Add a small legend (last few / limited / good / suggested).
  - Render `timeNote` with `RichText` (the `==Suggest…==` part shows as a highlight).
- Each card has a Radix Collapsible, "Details", that shows:
  - the `fields` (Ticket type, plus Also open for Sagrada);
  - **Confirmation**, an input saved to localStorage under key `slot-confirmations`, showing "—" when empty (the original had "—");
  - **Book**, a button linking to `bookHref` with `bookLabel`;
  - "See in day plan", which calls `goToDay(venue.dayId)`.
- Grid layout: 1 column on mobile, 2 at `md`.

### 3. `DaysSection` (`#days`, 05, "The week" / "Day by day" / `daysIntro.lead`); data in `days.ts`

- Use a day picker strip with 8 buttons (weekday and date), each with a dot in its city colour. Travel days (25, 26) get a two-colour dot.
- Connect the buttons with a thin line, and mark the active one with a `layoutId` spring.
- Use `role="tablist"`, or buttons with `aria-pressed`/`aria-controls`, and support arrow keys.
- Run an Embla carousel underneath that stays in sync with `useTrip().dayIndex` both ways (`emblaApi.scrollTo`, and `on('select')`).
  - Swiping works on mobile; previous/next buttons are needed everywhere.
  - Use `aria-roledescription="carousel"` on the carousel and "slide" with "N of 8" on each slide.
  - Make the non-active slides `inert` so keyboard focus never lands offscreen.
  - Consider `embla-carousel-auto-height`.
- Slide layout:
  - Mobile: stack the photo(s), then the content.
  - Desktop: two columns, with photos (5 of 12 columns, `ZoomablePhoto` sharing the day's photo list as the gallery) beside the content (7 of 12).
  - Show `PhotoCredit` under each photo.
  - Content: `dateLine` as a kicker in the city colour, `title` as h3, then the blocks:
    - `intro` as a lead paragraph;
    - `time` as a vertical timeline (a dot and line, the label as a small uppercase olive kicker, the text through `RichText`);
    - `unverified` as a callout with a terracotta left border, labelled "Not verified".
- Every slide needs `id={day.id}` (for example `day-23`) for anchors.

### 4. `SpotsSection` (`#tickets`, 06, kicker "Barcelona", "Top spots and tickets", intro); data in `spots.ts`

- Expandable venue cards in a grid (1, 2 or 3 columns).
- Collapsed: photo (`ZoomablePhoto`, with a `PhotoCredit` caption. This covers the "Photo: …, Commons" credits that the original put inside the Batlló, Pedrera and Bunkers text), name, and a headline `price` chip.
- Expanded (Radix Collapsible, animated height): the `body` text, link buttons, and "Open slots", which scrolls to `slotId` when one exists.
- Sant Pau has no photo, so give it a typographic card.
- Put the `footnote` (Casa Vicens) below the grid.

### 5. `FoodSection` (`#food`, 07, "Halal-friendly" / "Where to eat" / intro); data in `food.ts`

- City filter using Radix Tabs or `Segmented`: All / Barcelona / Valencia / Lisbon, with counts.
- List each place with its name in Fraunces and its text in `RichText`. The El Raval entry has no name. Accent each city in its city colour.
- Render each city's `note`: the `unverified` tone (Valencia) as a terracotta callout, and `info` as muted text (this includes the source links).
- Animate list changes with `AnimatePresence`, using `popLayout`.

### 6. `MosquesSection` (`#pray`, 08, "Prayer" / "Mosques"); data in `food.ts` (`mosques`)

Three city cards with each mosque's name and text, which includes the links. The nav item "Food & prayer" points to `#food`. Optionally, share the food city filter.

### 7. `StaySection` (`#stay`, 09, "Hotels" / "Where to stay"); data in `stay.ts`

Three cards with a city-colour top rule, the title ("Barcelona, 3 nights"), then **base** in bold followed by `body`. This reproduces the original sentence exactly: `<strong>base</strong> body`.

### 8. `WeatherSection` (`#weather`, 10, "Late November" / "Weather and daylight" / intro); data in `weather.ts`

- One card per city:
  - a temperature range bar on a shared scale (about 5–20°C), drawing the low range and the high range as bands;
  - a wet-day gauge using `wetChance`, labelled with `wetLabel`;
  - the `summary` text;
  - sunrise and sunset rows, each with a 24-hour daylight bar and the times;
  - `sunFootnote` "(All local.)" for Lisbon.
- Put `weatherSources` underneath, rendered with `RichText`.

### 9. `Footer`; data in `trip.ts` (`about`) and `photos.ts` (`creditOrder`)

Show the kicker "Sources & photo credits", "About this page", the body text, the credit list in 1, 2 or 3 columns ("{creditLabel} — {artist}, [license], [fileLabel]" in exactly the original format), and `otherSources`.

### 10. Deploy: `.github/workflows/deploy.yml`

```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [main]
  workflow_dispatch:
permissions:
  contents: read
  pages: write
  id-token: write
concurrency:
  group: pages
  cancel-in-progress: true
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm
      - run: npm ci
      - run: npm run lint
      - run: npm run build
      - uses: actions/configure-pages@v5
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist
  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

`base: '/spain-portugal-trip/'` is already set in `vite.config.ts`. The PR must say: **Settings → Pages → Build and deployment → Source: "GitHub Actions"**. The site is a single page with only hash anchors, so it needs no 404/SPA fallback.

### 11. QA and wrap-up

- Run `npm run build` and `npm run lint` and get both to zero errors.
- Run `npm run preview` and check 375px, 768px and 1280px.
- Screenshots: `playwright-core` is installed and Chrome is at `/usr/local/bin/google-chrome`. Use `chromium.launch({ executablePath })`. Capture the hero, `#route`, one day (for example after `goToDay('day-23')`), and `#slots` at 375px and 1280px. Save them under `/opt/cursor/artifacts/` and reference them in the PR body. Don't commit them; `screenshots/` is gitignored.
- Lighthouse is optional: `npx lighthouse http://localhost:4173/spain-portugal-trip/ --chrome-flags=--headless`.
- Content audit: compare every text and link in `legacy-index.html` with the rendered DOM. For example, extract all `href`s from both and diff them. Then delete `legacy-index.html` and remove it from the ESLint ignores.

## Known issues and notes

- **The build fails** until `src/App.tsx` exists. That is the only TypeScript error right now.
- **Invalid list markup.** `ChecklistSection` wraps `<li>` inside `<Reveal>`, which is a `<div>`, inside a `<ul>`. Put the motion props on a `motion.li` instead (for example, give `Reveal` an `as` prop or use `motion.li` directly).
- **Clipped shadow.** `.stub` uses a CSS mask, which also clips `box-shadow`, so `shadow-lift` on the selected flight card won't show. Use a ring or border change instead (the border already darkens to `border-ink`).
- **Double scroll offset.** `RouteSection` has `scroll-mt-28` and `html` also has `scroll-padding-top`, so the offset is applied twice. Remove `scroll-mt-28`.
- **Imagetools fallback.** Check what `picture.img.src` resolves to in the build (which width the JPEG fallback uses), and add `srcset` to the `<img>` if needed. `Photo` currently passes only `src` to `<img>`, with the WebP `<source srcset>` carrying the sizes.
- **Map label positions** (`cities.ts` `labelX`/`labelY`) and the map's small text sizes need a visual check at 375px.
- **Fonts.** Instrument Sans uses the default `@fontsource-variable/instrument-sans` (weight axis); Fraunces uses `opsz.css` and `opsz-italic.css`. Preloading the hero font is a possible Lighthouse improvement.
- **Derived values (not new facts).** The hero countdown, flight totals and per-time slot chips are all derived from the original text. When the source gave a range (Park Güell's "other slots limited"), the chips follow it literally. Don't add per-slot prices that the source doesn't state (for example, which Casa Batlló slots cost €33).
- **Alt text** is standardised per photo; the original used slightly different alt text for the same photo in different places.
- **Airport names** (`airportNames` in `flights.ts`) are used only for screen-reader text.

## Run

```bash
npm ci
npm run dev        # http://localhost:5173/spain-portugal-trip/
npm run build      # tsc -b && vite build -> dist/
npm run preview    # http://localhost:4173/spain-portugal-trip/
npm run lint
```

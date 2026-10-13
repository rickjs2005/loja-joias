**English** | [Português](README.pt-BR.md)

# ÁUREA — Jewelry Showcase (WhatsApp sales funnel)

A premium storefront (light, editorial look) for a **fictional** handmade jewelry
brand ("ÁUREA"). **It is not an e-commerce site**: there is no cart, checkout or
payment. Every call to action opens WhatsApp with a ready-made message containing
the piece's **Name · Reference · Price**. The interface is in Brazilian Portuguese.

> **Type:** commercial demo (fictional brand; pieces, prices and testimonials are illustrative) · **Demo:** https://loja-joias-two.vercel.app

![ÁUREA showcase home page](docs/screenshots/home.webp)

## Features

- **`/`** — home: hero with parallax/particles, collections by category,
  highlights, brand/atelier, differentiators, testimonials, Instagram grid, FAQ
  and store visit.
- **`/pecas/[reference]`** — piece page (11 pieces, statically generated):
  zoomable gallery, materials, warranty, care, related pieces and product JSON-LD.
- **`/experimentar`** — **Virtual Mirror**: try earrings and necklaces on through
  the camera in real time (MediaPipe FaceLandmarker), take a photo, share it and
  continue on WhatsApp. Processing happens in the browser; the WASM runtime and
  model are downloaded on demand from public CDNs (jsDelivr and Google Storage).
- Light/dark theme toggle, `sitemap.xml`, `robots.txt` and a 404 page.
- Reusable micro-interactions: `Button` (ripple + magnetic), `CustomCursor`,
  `LuxuryReflection`, `TextReveal`, `ScrollProgress`, `Reveal` and `Showcase`
  (3D display-case effect on cards — see [docs/vitrine-3d.md](docs/vitrine-3d.md), in Portuguese).

![Virtual Mirror](docs/screenshots/experimentar.webp)

## Stack

- **Next.js 15** (App Router) + React 19 + TypeScript
- **Tailwind CSS v4** (CSS-first theme, no `tailwind.config`)
- **Framer Motion** + **GSAP** (animations respect `prefers-reduced-motion`)
- **Lenis** (smooth scroll), Radix Accordion, **lucide-react**
- **@mediapipe/tasks-vision** (Virtual Mirror)
- File-based catalog (`src/lib/data/catalog.ts`), no database

## Requirements and running

Node.js 20 or newer (tested with Node 22) and npm.

```bash
npm ci
npm run dev      # http://localhost:3000
```

No environment variables are required.

### Scripts

| Command | What it does |
|---|---|
| `npm run dev` | development server |
| `npm run build` | production build |
| `npm run start` | serve the build |
| `npm run lint` | ESLint |
| `npx tsc --noEmit` | type check |

## Customization (white-label)

| What | Where |
|---|---|
| Brand, WhatsApp, Instagram (handle and URL), e-mail, city, site URL, **colors** | `src/config/theme.config.ts` |
| Marketing copy (hero, sections, CTAs, testimonials) | `src/config/copy.ts` |
| Piece catalog | `src/lib/data/catalog.ts` |

Colors are mirrored in `src/app/globals.css` (`:root`) and in
`theme.config.ts`; update both when changing the palette.

**WhatsApp:** the number lives only in `theme.config.ts` and is normalized by
`src/lib/phone.ts`. Links always go through `waUrl()` / `productWaUrl()` /
`<WhatsappCta>` (`src/lib/whatsapp.ts`). In this demo the configured number is
the business contact of MilWeb, the project's author.

**Fictional contacts:** the e-mail uses the reserved `aurea.example` domain and
the Instagram buttons point to Instagram's home page — the displayed handle is
fictional. Replace `instagramUrl` with the real profile URL when customizing.

**Piece photos:** stored in `public/pecas/` (one per piece, named by reference,
e.g. `aur-a01.jpg`) and listed in each piece's `images` array in `catalog.ts`.
Without `images`, the site renders an editorial placeholder (gradient with the
category icon).

## Structure

```
src/
  app/          layout, home, /pecas/[reference], /experimentar, sitemap, robots, 404
  components/   page sections (Hero, Collection, Atelier, ...)
    ui/         reusable primitives (Container, Reveal, WhatsappCta, Showcase, ...)
    mirror/     Virtual Mirror
  config/       theme.config.ts (brand/colors/contacts) + copy.ts (copy)
  hooks/        useScrolled
  lib/          phone, format, whatsapp, motion, cn, mirror/, data/ (catalog + types)
docs/           3D display-case effect notes and screenshots
```

## Limitations

- No cart, checkout, payment, stock control or admin panel (product decision).
- Catalog, prices, testimonials and store details are fictional and hard-coded.
- The Virtual Mirror needs a camera, a browser with WebAssembly and downloading the model from external CDNs.

## Credits

The photos in `public/pecas/` appear to be stock photography; their origin and
license are not documented in the repository (one of them carries an EXIF credit
to photographer Atul Mohan). The logo files in `public/` have no documented
origin either.

## Security

See [SECURITY.md](SECURITY.md).

## License

No license has been chosen yet; all rights reserved by the author.

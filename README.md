# Adreil Eiden — Christening Invitation

A premium, mobile-first interactive christening invitation built with the Next.js App Router. The experience opens on a sealed envelope, reveals a portrait-led hero, and hosts a quiet background-music control. All family and event details live in one configuration file.

## Tech stack

- Next.js 16 (App Router, static export) + React 19
- TypeScript & Tailwind CSS v4
- Motion for animation
- Lucide React for icons
- date-fns + @date-fns/tz for timezone-safe dates
- qrcode.react for personalized invitation QR codes

## Getting started

Requires Node.js 20.9 or newer.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run lint       # ESLint
npm run typecheck  # TypeScript
npm run build      # production build + static export
```

## Edit the invitation

Everything personal lives in [`src/config/invitation.ts`](src/config/invitation.ts). Do not hardcode names, dates, or links inside components.

Before publishing, update:

- Baby, parents, and godparents' names
- Ceremony and reception dates, times, addresses, and Google Maps links
- Portrait and gallery photographs with meaningful alt text
- `rsvp.googleFormUrl` (replace the placeholder form ID)
- `godparentInvitation.response.contactEmail` if you want email response actions
- Music file, credits, and volume — or set `music.enabled` to `false`
- `share.siteUrl` so the Open Graph metadata and QR codes point at the live site
- `meta.indexable` if you want the page indexed by search engines

The canonical event date is `event.startsAt` in the config. It currently reads **January 3, 2027**; confirm the intended date before publishing.

The `theme` block drives the CSS palette (background, primary sage, secondary, gold accent, text, and muted tones). Change those values and the whole invitation updates without touching component classes.

The schema is typed in [`src/types/invitation.ts`](src/types/invitation.ts), so the editor catches missing or malformed fields.

### Personalized godparent invitations

Each Ninong and Ninang receives a URL like `/invitation/antonio-reyes/`. Slugs are generated from the recipient's name; set an explicit `slug` on a godparent if you need something different. An optional `personalizedMessage` adds a short note to that person's invitation.

- General invitation: `/invitation/`
- Personalized invitation: `/invitation/<slug>/`
- Owner link and QR view: `/invitation/links/` — run `npm run dev` locally

To add another Ninong or Ninang, add `{ name: "Full Name" }` to `godparents.ninongs` or `godparents.ninangs` in the config. Personalized pages are pre-rendered at build time, so rerun `npm run build` after changing the list. Duplicate or reserved slugs stop the build with a clear error instead of publishing a broken link.

**Responses:** there is no backend or database. Setting `godparentInvitation.response.contactEmail` enables two `mailto:` actions; the reply opens in the guest's email app and is **not stored by this website**. Leave the field empty to hide those actions. For real persistence, use a dedicated Google Form or a Cloudflare Pages Function backed by D1/KV.

**Privacy:** this is a static export. Recipient names and slugs are embedded in the exported files and are inspectable by anyone with access to the site. Readable slugs are convenient, not secret. The owner link/QR page is disabled in production. If link privacy matters, use a server-side recipient lookup with opaque tokens instead of a static export.

### Assets

| File | Purpose |
| --- | --- |
| `public/images/portrait.jpg` | Hero portrait (1200 × 1500) |
| `public/images/gallery-*.jpg` | Gallery photographs (1800 × 1200) |
| `public/music/quiet-blessing.mp3` | Optional background music |

Keep photographs compressed (roughly 150–300 KB each) and preserve the declared aspect ratios to avoid layout shift. Replace the placeholder photographs with images you have permission to publish.

## What is implemented

**Phase 1 — foundation**

- Elegant Botanical design tokens driven by the `theme` config
- Paper grain, premium Cormorant Garamond + Jost typography
- Static-export configuration, metadata, custom favicon
- Typed invitation content model

**Phase 2 — opening experience**

- Full-screen envelope gate with a sage-green wax seal, flap, and letter animation
- Keyboard-accessible open action, focus trap, and scroll lock while sealed
- Hero section with arched portrait, date badge, botanicals, and entrance motion
- Config-driven hero copy and parents' details
- Optional background music with a visible play/pause control (never autoplays)
- Footer with closing message and music attribution

**Personalized godparent invitations**

- `/invitation/` general route and `/invitation/[slug]/` personalized routes
- “A Special Request” section with the recipient's name and Ninong/Ninang question
- Optional per-recipient note from the family
- Per-recipient metadata and a graceful not-found page for invalid links
- Development-only owner view with copyable links and QR codes
- Optional `mailto:` response actions; no response persistence is claimed

The story section after the hero is an intentional Phase 2 placeholder. Later phases will replace it with:

- Countdown and event details
- Godparents
- Gallery with lightbox
- RSVP via configurable Google Form + QR code
- Closing section

## Accessibility & motion

- The envelope gate is a labelled modal dialog. Tab remains on the open button, Enter/Space opens it, and the hero heading receives focus when the invitation is revealed.
- Background music never starts before a user gesture; playback state persists while scrolling.
- `prefers-reduced-motion` is respected through both CSS and Motion's `MotionConfig`, removing transform animations without changing layout.
- Portraits are loaded through `next/image` with explicit dimensions and descriptive alt text.
- Focus-visible styles and a skip link are provided.

## Static export

`next.config.ts` sets `output: "export"`, `trailingSlash: true`, and `images.unoptimized: true`, so `npm run build` writes a fully static site to `out/`.

Every personalized godparent route is generated through `generateStaticParams()` with `dynamicParams = false`. Unknown invitation URLs resolve to the exported `out/404.html`, which links back to the general invitation. The `/invitation/links/` owner view is intentionally blocked during production builds.

Preview the exported site locally:

```bash
npx serve out
```

> Cloudflare Pages serves `404.html` for unknown paths automatically. If you use another host, configure it to serve `404.html` as the not-found page.

## Deploy to Cloudflare Pages

### Git integration

1. Push the repository to GitHub or GitLab.
2. In the Cloudflare dashboard, open **Workers & Pages → Create → Pages → Connect to Git**.
3. Select the repository and use:
   - **Framework preset:** Next.js (Static HTML Export)
   - **Build command:** `npm run build`
   - **Build output directory:** `out`
   - **Node version:** 20 or newer (`NODE_VERSION=20`)
4. Deploy. Every push to the production branch rebuilds the site.

### Direct upload with Wrangler

```bash
npm run build
npx wrangler pages deploy out --project-name=christening-invitation
```

No SPA rewrite is required: every route is exported as its own `index.html` because `trailingSlash` is enabled.

After the first deployment, set `share.siteUrl` in the invitation config to the final custom domain (for example `https://adreil.example.com`) and redeploy so social previews and the QR code use the correct URL.

## Music credit

“Meditation Impromptu 01” by Kevin MacLeod ([incompetech.com](https://incompetech.com)), licensed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). The credit is displayed in the site footer. Replace it if you change the track.

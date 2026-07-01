# Assets

## Image quality (important)

**Do not use `next/image` for brand illustrations or SVGs** — it recompresses and downscales them, which causes blur. This project uses `CrispImage` (native `<img>`) instead.

**Best formats:**
- **SVG** for logos, icons, and flat illustrations (always sharp at any size)
- **PNG at 2× display size** for complex art on retina screens (e.g. banner logo shown at ~470px wide → export at ~940px wide)

Drop files here and update paths in `lib/assets.ts`.

| File | Format |
|------|--------|
| `banner-dots`, `banner-logo`, `banner-diem` | SVG preferred, or PNG @2x |

| File | Format |
|------|--------|
| `logo-5-9-play-haus.svg` | SVG or PNG |
| `character-diem-hero` | PNG |
| `diem-badge-photo` | JPG |
| `step-sculpt`, `step-bake`, `step-paint` | JPG |
| `workshop-cozy`, `workshop-corporate`, `workshop-private` | JPG |
| `gallery-figurines`, `gallery-diem-polaroid` | JPG |
| `chibi-diem` | PNG |
| `instagram.svg` | SVG |
| `icon-calendar.svg`, `icon-mail.svg` | Nav icons (from Figma) |

After adding real images, update paths in `lib/assets.ts` if extensions change.

Fonts go in `public/fonts/` and can be wired in `app/layout.tsx` via `next/font/local`.

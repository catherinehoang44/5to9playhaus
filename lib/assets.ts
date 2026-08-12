/**
 * Asset manifest — drop files into public/assets/ with these names.
 * Replace placeholders when final images are provided.
 */
/** Swap .svg paths to .jpg/.png when final assets are dropped in. */
export const assets = {
  bannerDots: "/assets/banner-dots@2x.png",
  bannerLogo: "/assets/banner-logo@2x.png",
  bannerDiem: "/assets/banner-diem@2x.png",
  bannerFull: "/assets/header-banner@2x.png",
  logo: "/assets/logo-5-9-play-haus.svg",
  characterDiemHero: "/assets/character-diem-hero.svg",
  diemBadgePhoto: "/assets/diem-badge-photo.svg",
  stepSculpt: "/assets/step-sculpt@2x.png",
  stepBake: "/assets/step-bake@2x.png",
  stepPaint: "/assets/step-paint@2x.png",
  workshopCozy: "/assets/workshop-cozy@2x.png",
  workshopCorporate: "/assets/workshop-corporate@2x.png",
  workshopPrivate: "/assets/workshop-private@2x.png",
  workshopDivider: "/assets/workshop-divider.svg",
  privacyDivider: "/assets/privacy-divider.svg",
  galleryFigurines: "/assets/gallery-figurines@2x.png",
  galleryPolaroidPhoto: "/assets/gallery-polaroid-photo@2x.png",
  galleryChibi: "/assets/gallery-chibi.png",
  galleryTapeWide: "/assets/gallery-tape-wide.svg",
  galleryTapeWideOverlay: "/assets/gallery-tape-wide-overlay.svg",
  galleryTapeNarrow: "/assets/gallery-tape-narrow.svg",
  galleryTapeNarrowOverlay: "/assets/gallery-tape-narrow-overlay.svg",
  chibiDiem: "/assets/chibi-diem.svg",
  instagram: "/assets/instagram.svg",
  iconCalendar: "/assets/icon-calendar.svg",
  iconMail: "/assets/icon-mail.svg",
  whoWeAreBadgeFrame: "/assets/who-we-are-badge-frame.svg",
  whoWeAreBadgeFrameAccent: "/assets/who-we-are-badge-frame-accent.svg",
  whoWeAreBadgeTexture: "/assets/who-we-are-badge-texture.png",
  whoWeAreStrapTexture: "/assets/who-we-are-strap-texture.png",
  /** Figma 94:2431 — 150.46 × 266 (exported @3x) */
  whoWeAreFigurine: "/assets/who-we-are-figurine@2x.png",
  /** Figma 94:2421 — 302 × 131.77 (exported @3x) */
  whoWeAreHand: "/assets/who-we-are-hand@2x.png",
  /**
   * Figurine rotation frames (Figma symbols 58:13627–58:13634).
   * Transparent PNGs, all 440×640 — each frame is padded so the yellow
   * platform sits on the horizontal center (not the full silhouette).
   *
   * Ordered for a full clockwise 360° spin starting from front:
   * front → front-right → right → back-right → back → back-left → left → front-left.
   * (Figma nodes 58:13631, 58:13634, 58:13633, 58:13632, 58:13629, 58:13628, 58:13630, 58:13627.)
   */
  figurineFrames: [
    "/assets/figurine-frame-5.png",
    "/assets/figurine-frame-8.png",
    "/assets/figurine-frame-7.png",
    "/assets/figurine-frame-6.png",
    "/assets/figurine-frame-3.png",
    "/assets/figurine-frame-2.png",
    "/assets/figurine-frame-4.png",
    "/assets/figurine-frame-1.png",
  ],
} as const;

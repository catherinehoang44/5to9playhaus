import { CrispFillImage, CrispImage } from "@/components/CrispImage";
import { SiteContainer } from "@/components/SiteContainer";
import { assets } from "@/lib/assets";

const BADGE_W = 776;
const BADGE_H = 913;


/** ID card content area — Figma 720.4 × 452 */
const CARD_W = 720.4;
const CARD_H = 452;
/** Text block max height within card (368.3px in Figma) */
const TEXT_MAX_HEIGHT_CARD = ((452 - (516 - 432.3)) / CARD_H) * 100;

const STRAP_W = 127.4;
const STRAP_H = 268.5;
/** Strap texture (image 127) — 740 × 493 */
const STRAP_TEXTURE_W = 740;
const STRAP_TEXTURE_H = 493;

/** Figma badge frame layers — 94:2404 (accent) / 94:2409 (base), 8px apart */
const BADGE_FRAME_TOP = 324.6;
const BADGE_FRAME_H = 588.4;
const BADGE_BG_LAYER_OFFSET = 8;

function Badge() {
  return (
    <div
      className="relative w-full max-w-[776px] [container-type:size]"
      style={{ aspectRatio: "776 / 913" }}
    >
      {/* Badge bg — FF9B8A accent (8px higher) under CB513C base */}
      <div
        className="absolute left-0 z-0 w-full"
        style={{
          top: `${((BADGE_FRAME_TOP - BADGE_BG_LAYER_OFFSET) / BADGE_H) * 100}%`,
          height: `${(BADGE_FRAME_H / BADGE_H) * 100}%`,
        }}
      >
        <CrispImage
          src={assets.whoWeAreBadgeFrameAccent}
          alt=""
          width={776}
          height={588}
          className="h-full w-full"
          aria-hidden
        />
      </div>
      <div
        className="absolute left-0 z-[1] w-full"
        style={{
          top: `${(BADGE_FRAME_TOP / BADGE_H) * 100}%`,
          height: `${(BADGE_FRAME_H / BADGE_H) * 100}%`,
        }}
      >
        <CrispImage
          src={assets.whoWeAreBadgeFrame}
          alt=""
          width={776}
          height={588}
          className="h-full w-full"
          aria-hidden
        />
      </div>

      {/* Lanyard strap + buckle — above badge frame */}
      <div
        className="absolute left-1/2 z-10 -translate-x-1/2 overflow-hidden bg-[#e60000]"
        style={{
          top: 0,
          width: `${(STRAP_W / BADGE_W) * 100}%`,
          height: `${(STRAP_H / BADGE_H) * 100}%`,
        }}
      >
        <CrispFillImage
          src={assets.whoWeAreStrapTexture}
          alt=""
          width={STRAP_TEXTURE_W}
          height={STRAP_TEXTURE_H}
          className="pointer-events-none max-w-none object-cover mix-blend-color-burn opacity-20"
          aria-hidden
        />
      </div>

      <div
        className="absolute left-1/2 z-10 flex -translate-x-1/2 items-center justify-center rounded-[6px] border-t-[3px] border-[#e68925] bg-[#c06300]"
        style={{
          top: `${(256.3 / 913) * 100}%`,
          width: `${(142.6 / 776) * 100}%`,
          height: `${(110.7 / 913) * 100}%`,
        }}
      >
        <div
          className="rounded-[6px] bg-[#983b00]"
          style={{ width: "67%", height: "9.6%" }}
        />
      </div>

      {/* ID card content */}
      <div
        className="absolute z-20 overflow-hidden rounded-[6px] border-[6px] border-[#901c08] bg-[#fffaee]"
        style={{
          left: `${(27.6 / 776) * 100}%`,
          top: `${(432.3 / 913) * 100}%`,
          width: `${(720.4 / 776) * 100}%`,
          height: `${(452 / 913) * 100}%`,
        }}
      >
        <CrispImage
          src={assets.whoWeAreBadgeTexture}
          alt=""
          width={750}
          height={1143}
          className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-25 mix-blend-multiply"
          aria-hidden
        />

        <div
          className="font-who-we-are absolute top-1/2 flex -translate-y-1/2 flex-col gap-[0.35em] overflow-hidden text-[#563529]"
          style={{
            left: `${((390 - 27.6) / CARD_W) * 100}%`,
            width: `${(302 / CARD_W) * 100}%`,
            maxHeight: `${TEXT_MAX_HEIGHT_CARD}%`,
            fontSize:
              "calc(var(--badge-bio-font-size) / var(--badge-bio-badge-height) * 100cqh)",
            letterSpacing:
              "calc(var(--badge-bio-letter-spacing) / var(--badge-bio-badge-height) * 100cqh)",
            lineHeight: 1.05,
          }}
        >
          <p>
            Hi, I&apos;m your host,{" "}
            <span className="font-bold text-[#8e1c08]">Diem</span>!
          </p>
          <p>
            Every workshop I host is built around the feeling of slowing down
            without the pressure to make anything &ldquo;great&rdquo;.
          </p>
          <p>I hope I can make these few hours feel like yours!</p>
        </div>
      </div>
    </div>
  );
}

export function WhoWeAre() {
  return (
    <section className="bg-grid -mt-[var(--section-gap)] overflow-x-clip overflow-y-visible">
      <SiteContainer
        className="relative flex items-start justify-center px-4 pb-[var(--who-we-are-section-padding)] pl-14 sm:px-6 sm:pl-16"
      >
        <div className="pointer-events-none absolute inset-y-0 left-4 flex items-end justify-center sm:left-6">
          <h2 className="vertical-label text-center font-nav-title text-heading-who-we-are font-bold leading-none tracking-[13.12px] whitespace-nowrap text-[#e57c62]">
            WHO WE ARE
          </h2>
        </div>

        <div className="flex w-full justify-center self-start">
          <Badge />
        </div>
      </SiteContainer>
    </section>
  );
}

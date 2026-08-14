import { CrispImage } from "@/components/CrispImage";
import { BannerDiem } from "@/components/BannerDiem";
import { SiteContainer } from "@/components/SiteContainer";
import { BANNER_DIEM_H, BANNER_DIEM_W } from "@/lib/banner-diem-layers";
import { assets } from "@/lib/assets";

const BANNER_BG = "#cb513c";

/** Figma Frame 45 inside header-banner 93:2141 */
const FRAME_W = 1242;
const FRAME_H = 525;
const LOGO_W = 492.25354;
const LOGO_IMG_W = 466;
const LOGO_IMG_H = 497;
const DIEM_X = 608;
const DIEM_W = 634;

/** Vertical padding on the title slot for text-header banners (privacy, etc.). */
const TEXT_BANNER_PAD =
  "flex min-w-0 items-center py-8 sm:py-10 lg:py-12";

type HeroProps = {
  variant?: "home" | "privacy";
};

function PrivacyBannerTitle({ className = "" }: { className?: string }) {
  return (
    <div
      className={`flex min-w-0 w-full flex-col justify-center font-nav-title text-heading-privacy-banner font-bold uppercase leading-none text-white ${className}`.trim()}
      aria-label="Privacy and Refund Policy"
    >
      <span className="block">Privacy</span>
      <span className="block">& Refund</span>
      <span className="block">Policy</span>
    </div>
  );
}

function BannerLogo({ className }: { className?: string }) {
  return (
    <CrispImage
      src={assets.bannerLogo}
      alt="5-9 PLAY HAUS — hosted by Diem"
      width={LOGO_IMG_W}
      height={LOGO_IMG_H}
      fetchPriority="high"
      className={className}
      style={{ aspectRatio: `${LOGO_IMG_W} / ${LOGO_IMG_H}` }}
    />
  );
}

function DiemFrame({
  className,
  style,
  hideName = false,
}: {
  className?: string;
  style?: React.CSSProperties;
  hideName?: boolean;
}) {
  return (
    <div
      className={className}
      style={style}
      role="img"
      aria-label="Diem, workshop host"
    >
      <BannerDiem hideName={hideName} />
    </div>
  );
}

function LogoBanner() {
  return (
    <>
      {/* Mobile: logo stacked above Diem. Diem keeps 634×525. Banner height hugs. */}
      <div className="flex w-full flex-col md:hidden">
        <div
          className="w-full overflow-hidden"
          style={{ aspectRatio: `${LOGO_IMG_W} / ${LOGO_IMG_H}` }}
        >
          <BannerLogo className="h-full w-full object-contain" />
        </div>
        <DiemFrame
          className="relative w-full"
          style={{ aspectRatio: `${BANNER_DIEM_W} / ${BANNER_DIEM_H}` }}
        />
      </div>

      {/* Desktop/tablet: Figma Frame 45 (1242×525), Diem aspect-locked. */}
      <div
        className="relative hidden w-full md:block"
        style={{ aspectRatio: `${FRAME_W} / ${FRAME_H}` }}
      >
        <div
          className="absolute top-0 left-0 h-full min-w-0"
          style={{ width: `${(LOGO_W / FRAME_W) * 100}%` }}
        >
          <BannerLogo className="h-full w-full object-contain object-left" />
        </div>
        <DiemFrame
          className="absolute top-0"
          style={{
            left: `${(DIEM_X / FRAME_W) * 100}%`,
            width: `${(DIEM_W / FRAME_W) * 100}%`,
            aspectRatio: `${BANNER_DIEM_W} / ${BANNER_DIEM_H}`,
          }}
        />
      </div>
    </>
  );
}

function TextBanner() {
  return (
    <>
      {/* Mobile/tablet: title + Diem in a row. Title has padding; Diem scales. */}
      <div className="flex w-full items-stretch gap-3 sm:gap-4 lg:hidden">
        <div className={`flex-1 ${TEXT_BANNER_PAD}`}>
          <PrivacyBannerTitle />
        </div>
        <DiemFrame
          hideName
          className="relative w-[46%] shrink-0 self-end sm:w-[48%]"
          style={{ aspectRatio: `${BANNER_DIEM_W} / ${BANNER_DIEM_H}` }}
        />
      </div>

      {/* Desktop: Figma Frame 45, title slot padded. */}
      <div
        className="relative hidden w-full lg:block"
        style={{ aspectRatio: `${FRAME_W} / ${FRAME_H}` }}
      >
        <div
          className={`absolute top-0 left-0 h-full ${TEXT_BANNER_PAD}`}
          style={{ width: `${(LOGO_W / FRAME_W) * 100}%` }}
        >
          <PrivacyBannerTitle />
        </div>
        <DiemFrame
          hideName
          className="absolute top-0"
          style={{
            left: `${(DIEM_X / FRAME_W) * 100}%`,
            width: `${(DIEM_W / FRAME_W) * 100}%`,
            aspectRatio: `${BANNER_DIEM_W} / ${BANNER_DIEM_H}`,
          }}
        />
      </div>
    </>
  );
}

export function Hero({ variant = "home" }: HeroProps) {
  const isTextBanner = variant === "privacy";

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ backgroundColor: BANNER_BG }}
      aria-label={
        isTextBanner
          ? "Privacy and Refund Policy banner"
          : "5-9 PLAY HAUS banner"
      }
    >
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 h-full -translate-x-1/2 -translate-y-1/2"
        style={{ width: `${(471 / 1440) * 100}%` }}
      >
        <CrispImage
          src={assets.bannerDots}
          alt=""
          width={471}
          height={525}
          fetchPriority="high"
          className="h-full w-full"
          aria-hidden
        />
      </div>

      <SiteContainer className="relative z-10 px-3 md:px-6">
        {isTextBanner ? <TextBanner /> : <LogoBanner />}
      </SiteContainer>
    </section>
  );
}

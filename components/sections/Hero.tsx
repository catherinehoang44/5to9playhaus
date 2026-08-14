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

type HeroProps = {
  variant?: "home" | "privacy";
};

function PrivacyBannerTitle({ className = "" }: { className?: string }) {
  return (
    <div
      className={`flex min-w-0 w-full flex-col justify-center font-nav-title text-heading-privacy-banner font-bold leading-none text-white ${className}`.trim()}
      aria-label="Privacy and Refund Policy"
    >
      <span className="block">Privacy</span>
      <span className="block">& Refund</span>
      <span className="block">Policy</span>
    </div>
  );
}

function BannerLead({
  variant,
  layout,
}: {
  variant: NonNullable<HeroProps["variant"]>;
  layout: "mobile" | "desktop";
}) {
  if (variant === "privacy") {
    return (
      <PrivacyBannerTitle
        className={layout === "desktop" ? "h-full" : "h-auto"}
      />
    );
  }

  if (layout === "mobile") {
    return (
      <BannerLogo className="h-full w-full object-contain" />
    );
  }

  return (
    <BannerLogo className="h-full w-full object-contain object-left" />
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
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className={className}
      style={style}
      role="img"
      aria-label="Diem, workshop host"
    >
      <BannerDiem />
    </div>
  );
}

export function Hero({ variant = "home" }: HeroProps) {
  const isPrivacy = variant === "privacy";

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ backgroundColor: BANNER_BG }}
      aria-label={
        isPrivacy
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
        {/* Mobile: lead stacked above Diem. Diem keeps 634×525. Banner height hugs. */}
        <div className="flex w-full flex-col md:hidden">
          <div
            className={
              isPrivacy
                ? "flex w-full items-center py-8"
                : "w-full overflow-hidden"
            }
            style={
              isPrivacy
                ? undefined
                : { aspectRatio: `${LOGO_IMG_W} / ${LOGO_IMG_H}` }
            }
          >
            <BannerLead variant={variant} layout="mobile" />
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
            <BannerLead variant={variant} layout="desktop" />
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
      </SiteContainer>
    </section>
  );
}

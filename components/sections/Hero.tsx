import { CrispImage } from "@/components/CrispImage";
import { SiteContainer } from "@/components/SiteContainer";
import { assets } from "@/lib/assets";

/** Figma header-banner frame: 1440 × 525 */
const BANNER_ASPECT = 1440 / 525;
const BANNER_BG = "#cb513c";

type HeroProps = {
  variant?: "home" | "privacy";
};

function PrivacyBannerTitle() {
  return (
    <div
      className="flex h-full shrink-0 flex-col justify-center font-nav-title text-[82px] font-bold leading-none text-white"
      aria-label="Privacy and Refund Policy"
    >
      <span className="block">Privacy</span>
      <span className="block">& Refund</span>
      <span className="block">Policy</span>
    </div>
  );
}

export function Hero({ variant = "home" }: HeroProps) {
  return (
    <section
      className="relative flex w-full flex-col items-center justify-center overflow-hidden"
      style={{ aspectRatio: `${BANNER_ASPECT}`, backgroundColor: BANNER_BG }}
      aria-label={
        variant === "privacy"
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

      <SiteContainer className="relative z-10 flex h-full min-h-0 w-full flex-1 items-start justify-between">
        {variant === "privacy" ? (
          <PrivacyBannerTitle />
        ) : (
          <CrispImage
            src={assets.bannerLogo}
            alt="5-9 PLAY HAUS — hosted by Diem"
            width={466}
            height={497}
            fetchPriority="high"
            className="h-full w-auto shrink-0"
            style={{ aspectRatio: "466 / 497" }}
          />
        )}
        <CrispImage
          src={assets.bannerDiem}
          alt="Diem, workshop host"
          width={634}
          height={586}
          fetchPriority="high"
          className="shrink-0 object-contain object-top"
          style={{
            width: `${(634 / 1242) * 100}%`,
            maxWidth: 634,
            aspectRatio: "634 / 586",
          }}
        />
      </SiteContainer>
    </section>
  );
}

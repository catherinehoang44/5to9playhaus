import type { CSSProperties } from "react";
import { CrispImage } from "@/components/CrispImage";
import { SiteContainer } from "@/components/SiteContainer";
import { assets } from "@/lib/assets";

/** Figma gallery layout at 1242px container (offset from 1440 artboard). */
const DESIGN_W = 1242;
const DESIGN_H = 669;

/** Natural aspect of gallery source images */
const FIGURINES_ASPECT = "3072 / 4096";
const POLAROID_PHOTO_ASPECT = "3276 / 4096";

/** Tape SVG viewBox aspects */
const TAPE_WIDE_ASPECT = "358.201 / 41.8418";
const TAPE_NARROW_ASPECT = "63.4535 / 92.8867";

function designBox(
  left: number,
  top: number,
  width: number,
  height: number,
): CSSProperties {
  return {
    left: `${(left / DESIGN_W) * 100}%`,
    top: `${(top / DESIGN_H) * 100}%`,
    width: `${(width / DESIGN_W) * 100}%`,
    height: `${(height / DESIGN_H) * 100}%`,
  };
}

const leftPhoto = designBox(34, 0, 717, 529);
const rightPolaroid = designBox(796, 109, 428, 560);
const chibi = designBox(667, 492, 177, 177);

function Tape({
  tape,
  overlay,
  aspect,
  className,
  style,
}: {
  tape: string;
  overlay: string;
  aspect: string;
  className: string;
  style?: CSSProperties;
}) {
  return (
    <div
      className={`pointer-events-none absolute z-30 ${className}`}
      style={{ aspectRatio: aspect, ...style }}
      aria-hidden
    >
      <CrispImage
        src={tape}
        alt=""
        width={360}
        height={42}
        className="absolute inset-0 h-full w-full object-contain"
      />
      <CrispImage
        src={overlay}
        alt=""
        width={360}
        height={42}
        className="absolute inset-0 h-full w-full object-contain mix-blend-multiply"
      />
    </div>
  );
}

function LeftTapedPhoto() {
  return (
    <div className="absolute z-0" style={leftPhoto}>
      <Tape
        tape={assets.galleryTapeWide}
        overlay={assets.galleryTapeWideOverlay}
        aspect={TAPE_WIDE_ASPECT}
        className="left-[23.67%] top-[1%] w-[52.66%]"
      />

      <div className="absolute inset-x-0 bottom-0 top-[3.95%] overflow-hidden shadow-[-25px_0px_22px_-12px_rgba(0,0,0,0.25)]">
        <CrispImage
          src={assets.galleryFigurines}
          alt="Dozens of finished clay figurines arranged on moss"
          width={3072}
          height={4096}
          className="h-full w-full object-cover"
          style={{ objectPosition: "center 25%" }}
        />
      </div>
    </div>
  );
}

function RightPolaroid() {
  return (
    <div className="absolute z-10" style={rightPolaroid}>
      <Tape
        tape={assets.galleryTapeNarrow}
        overlay={assets.galleryTapeNarrowOverlay}
        aspect={TAPE_NARROW_ASPECT}
        className="left-[41.25%] top-[1%] w-[17.5%]"
      />

      <div className="absolute inset-x-0 bottom-0 top-[12.57%] bg-[#e6e4e2] shadow-[-11px_20px_22px_0px_rgba(0,0,0,0.2)]" />

      <div className="absolute inset-x-[5.36%] top-[16.67%] bottom-[15.03%] overflow-hidden">
        <CrispImage
          src={assets.galleryPolaroidPhoto}
          alt="Diem hosting a workshop"
          width={3276}
          height={4096}
          className="h-full w-full object-cover"
        />
      </div>

      <p className="absolute inset-x-[24.06%] bottom-[6.01%] top-[89.7%] text-center font-body text-[clamp(1rem,1.9vw,1.5rem)] leading-none text-nav-brown">
        With love, Diem
      </p>
    </div>
  );
}

function ClayDiem() {
  return (
    <div className="absolute z-20" style={chibi}>
      <CrispImage
        src={assets.galleryChibi}
        alt="Clay figurine of Diem"
        width={187}
        height={188}
        className="h-full w-full max-w-none object-contain"
      />
    </div>
  );
}

function MobileStacked() {
  return (
    <div className="flex flex-col items-center gap-10 px-4 pt-4 sm:px-6 md:hidden">
      <div className="relative w-full max-w-[360px]">
        <Tape
          tape={assets.galleryTapeWide}
          overlay={assets.galleryTapeWideOverlay}
          aspect={TAPE_WIDE_ASPECT}
          className="left-1/2 top-[-14px] w-[60%] -translate-x-1/2"
        />
        <div className="w-full overflow-hidden bg-[#f6f0e6] shadow-[0_10px_22px_-10px_rgba(0,0,0,0.25)]">
          <CrispImage
            src={assets.galleryFigurines}
            alt="Dozens of finished clay figurines arranged on moss"
            width={3072}
            height={4096}
            className="block h-auto w-full"
            style={{ aspectRatio: FIGURINES_ASPECT }}
          />
        </div>
      </div>

      <div className="relative w-full max-w-[320px]">
        <Tape
          tape={assets.galleryTapeNarrow}
          overlay={assets.galleryTapeNarrowOverlay}
          aspect={TAPE_NARROW_ASPECT}
          className="left-1/2 top-[-14px] w-[16%] -translate-x-1/2"
        />
        <div className="bg-[#e6e4e2] px-4 pb-4 pt-8 shadow-[0_12px_22px_-8px_rgba(0,0,0,0.25)]">
          <div className="w-full overflow-hidden">
            <CrispImage
              src={assets.galleryPolaroidPhoto}
              alt="Diem hosting a workshop"
              width={3276}
              height={4096}
              className="block h-auto w-full"
              style={{ aspectRatio: POLAROID_PHOTO_ASPECT }}
            />
          </div>
          <p className="mt-3 text-center font-body text-[clamp(0.95rem,3.5vw,1.15rem)] leading-none text-nav-brown">
            With love, Diem
          </p>
        </div>
        <div className="pointer-events-none absolute right-[-6%] bottom-[-6%] w-[36%] max-w-[120px]">
          <CrispImage
            src={assets.galleryChibi}
            alt="Clay figurine of Diem"
            width={187}
            height={188}
            className="block h-auto w-full"
            style={{ aspectRatio: "187 / 188" }}
          />
        </div>
      </div>
    </div>
  );
}

export function Gallery() {
  return (
    <section className="bg-grid overflow-x-clip overflow-y-visible pt-12 md:pt-16 lg:pt-0">
      <MobileStacked />
      <SiteContainer
        className="relative hidden w-full md:block"
        style={{ paddingBottom: `${(DESIGN_H / DESIGN_W) * 100}%` }}
      >
        <LeftTapedPhoto />
        <RightPolaroid />
        <ClayDiem />
      </SiteContainer>
    </section>
  );
}

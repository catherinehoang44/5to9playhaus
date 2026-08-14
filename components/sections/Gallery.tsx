import type { CSSProperties } from "react";
import { CrispImage } from "@/components/CrispImage";
import { SiteContainer } from "@/components/SiteContainer";
import {
  DesktopCollageStickers,
  MobileCollageStickers,
  MobilePhotoStickers,
  StickerShadowDefs,
} from "@/components/sections/GalleryStickers";
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

const PHOTO_SHADOW = "shadow-[-12px_16px_22px_-8px_rgba(0,0,0,0.22)]";

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

const leftPhoto = designBox(0, 0, 428, 560);
const rightPhoto = designBox(491, 109, 717, 529);

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
    <div className="absolute z-10" style={leftPhoto}>
      <Tape
        tape={assets.galleryTapeNarrow}
        overlay={assets.galleryTapeNarrowOverlay}
        aspect={TAPE_NARROW_ASPECT}
        className="left-[41.25%] top-[3.95%] w-[17.5%] -translate-y-1/2"
      />

      <div className={`absolute inset-x-0 bottom-0 top-[3.95%] overflow-hidden ${PHOTO_SHADOW}`}>
        <CrispImage
          src={assets.galleryPolaroidPhoto}
          alt="Diem hosting a workshop"
          width={3276}
          height={4096}
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  );
}

function RightTapedPhoto() {
  return (
    <div className="absolute z-0" style={rightPhoto}>
      <Tape
        tape={assets.galleryTapeWide}
        overlay={assets.galleryTapeWideOverlay}
        aspect={TAPE_WIDE_ASPECT}
        className="left-[23.67%] top-[1%] w-[52.66%]"
      />

      <div className={`absolute inset-x-0 bottom-0 top-[3.95%] overflow-hidden ${PHOTO_SHADOW}`}>
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

function MobileStacked() {
  return (
    <div className="flex flex-col items-center gap-10 px-4 pt-8 sm:px-6 md:hidden">
      <div className="relative w-full max-w-[320px]">
        <MobilePhotoStickers />
        <Tape
          tape={assets.galleryTapeNarrow}
          overlay={assets.galleryTapeNarrowOverlay}
          aspect={TAPE_NARROW_ASPECT}
          className="left-1/2 top-0 w-[16%] -translate-x-1/2 -translate-y-1/2"
        />
        <div className={`w-full overflow-hidden ${PHOTO_SHADOW}`}>
          <CrispImage
            src={assets.galleryPolaroidPhoto}
            alt="Diem hosting a workshop"
            width={3276}
            height={4096}
            className="block h-auto w-full"
            style={{ aspectRatio: POLAROID_PHOTO_ASPECT }}
          />
        </div>
      </div>

      <div className="relative w-full max-w-[360px]">
        <MobileCollageStickers />
        <Tape
          tape={assets.galleryTapeWide}
          overlay={assets.galleryTapeWideOverlay}
          aspect={TAPE_WIDE_ASPECT}
          className="left-1/2 top-[-14px] w-[60%] -translate-x-1/2"
        />
        <div className={`w-full overflow-hidden bg-[#f6f0e6] ${PHOTO_SHADOW}`}>
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
    </div>
  );
}

export function Gallery() {
  return (
    <section className="bg-grid overflow-visible pt-12 md:pt-16 lg:pt-10">
      <StickerShadowDefs />
      <MobileStacked />
      <SiteContainer className="relative hidden w-full px-4 sm:px-6 md:block">
        <div
          className="relative w-full overflow-visible"
          style={{ paddingBottom: `${(DESIGN_H / DESIGN_W) * 100}%` }}
        >
          <LeftTapedPhoto />
          <RightTapedPhoto />
          <DesktopCollageStickers />
        </div>
      </SiteContainer>
    </section>
  );
}

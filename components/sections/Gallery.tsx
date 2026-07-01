import type { CSSProperties } from "react";
import { CrispImage } from "@/components/CrispImage";
import { SiteContainer } from "@/components/SiteContainer";
import { assets } from "@/lib/assets";

/** Figma gallery layout at 1242px container (offset from 1440 artboard). */
const DESIGN_W = 1242;
const DESIGN_H = 669;

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
  className,
}: {
  tape: string;
  overlay: string;
  className: string;
}) {
  return (
    <div className={`pointer-events-none absolute ${className}`} aria-hidden>
      <CrispImage
        src={tape}
        alt=""
        width={360}
        height={42}
        className="absolute inset-0 h-full w-full"
      />
      <CrispImage
        src={overlay}
        alt=""
        width={360}
        height={42}
        className="absolute inset-0 h-full w-full mix-blend-multiply"
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
        className="inset-x-[23.67%] top-0 bottom-[92.09%]"
      />

      <div className="absolute inset-x-0 bottom-0 top-[3.95%] shadow-[-25px_0px_22px_-12px_rgba(0,0,0,0.25)]">
        <div className="absolute inset-0 overflow-hidden">
          <CrispImage
            src={assets.galleryFigurines}
            alt="Dozens of finished clay figurines arranged on moss"
            width={717}
            height={508}
            className="absolute max-w-none"
            style={{
              width: "101.46%",
              height: "190.92%",
              left: "-0.73%",
              top: "-70.16%",
            }}
          />
        </div>
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
        className="inset-x-[41.25%] top-0 bottom-[83.4%]"
      />

      <div className="absolute inset-x-0 bottom-0 top-[12.57%] bg-[#e6e4e2] shadow-[-11px_20px_22px_0px_rgba(0,0,0,0.2)]" />

      <div className="absolute inset-x-[5.36%] top-[16.67%] bottom-[15.03%] overflow-hidden">
        <CrispImage
          src={assets.galleryPolaroidPhoto}
          alt="Diem hosting a workshop"
          width={382}
          height={382}
          className="absolute inset-0 h-full w-full object-cover"
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
        width={177}
        height={177}
        className="h-full w-full max-w-none"
      />
    </div>
  );
}

export function Gallery() {
  return (
    <section className="bg-grid overflow-x-clip overflow-y-visible">
      <SiteContainer
        className="relative w-full"
        style={{ paddingBottom: `${(DESIGN_H / DESIGN_W) * 100}%` }}
      >
        <LeftTapedPhoto />
        <RightPolaroid />
        <ClayDiem />
      </SiteContainer>
    </section>
  );
}

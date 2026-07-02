"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { CrispImage } from "@/components/CrispImage";
import {
  BANNER_DIEM_H,
  BANNER_DIEM_W,
  bannerDiemBaseLayersAfterMouth,
  bannerDiemBaseLayersBeforeMouth,
  bannerDiemEyes,
  bannerDiemMouth,
  bannerDiemTopLayers,
  layerStyle,
  type BannerDiemEye,
  type BannerDiemLayer,
} from "@/lib/banner-diem-layers";

/** Extra star travel beyond the nominal bounds; pupil mask still clips. */
const STAR_MASK_OVERFLOW = 0.15;

function pupilMaskStyle(pupilSrc: string): CSSProperties {
  return {
    WebkitMaskImage: `url(${pupilSrc})`,
    maskImage: `url(${pupilSrc})`,
    WebkitMaskSize: "100% 100%",
    maskSize: "100% 100%",
    WebkitMaskRepeat: "no-repeat",
    maskRepeat: "no-repeat",
  };
}

function mouthMaskStyle(mouthSrc: string): CSSProperties {
  return {
    WebkitMaskImage: `url(${mouthSrc})`,
    maskImage: `url(${mouthSrc})`,
    WebkitMaskSize: "100% 100%",
    maskSize: "100% 100%",
    WebkitMaskRepeat: "no-repeat",
    maskRepeat: "no-repeat",
  };
}

function BannerLayer({
  layer,
  className = "",
}: {
  layer: BannerDiemLayer;
  className?: string;
}) {
  return (
    <CrispImage
      src={layer.src}
      alt=""
      width={Math.round(layer.w)}
      height={Math.round(layer.h)}
      className={`pointer-events-none absolute max-w-none ${className}`.trim()}
      style={layerStyle(layer)}
      aria-hidden
    />
  );
}

function TrackingEye({
  eye,
  frameRef,
}: {
  eye: BannerDiemEye;
  frameRef: React.RefObject<HTMLDivElement | null>;
}) {
  const pupilRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const { pupil, star } = eye;
  const starLeft = ((star.x - pupil.x) / pupil.w) * 100;
  const starTop = ((star.y - pupil.y) / pupil.h) * 100;
  const starWidth = (star.w / pupil.w) * 100;
  const starHeight = (star.h / pupil.h) * 100;

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReducedMotion) return;

    const onMove = (clientX: number, clientY: number) => {
      const frame = frameRef.current;
      const pupilEl = pupilRef.current;
      if (!frame || !pupilEl) return;

      const frameRect = frame.getBoundingClientRect();
      const scale = frameRect.width / BANNER_DIEM_W;
      const pupilRect = pupilEl.getBoundingClientRect();
      const cx = pupilRect.left + pupilRect.width / 2;
      const cy = pupilRect.top + pupilRect.height / 2;

      const dx = clientX - cx;
      const dy = clientY - cy;
      const angle = Math.atan2(dy, dx);
      const distance = Math.hypot(dx, dy);
      const influence = Math.min(distance / (220 * scale), 1);

      const maxX =
        Math.max(0, (pupil.w - star.w) / 2) + star.w * STAR_MASK_OVERFLOW;
      const maxY =
        Math.max(0, (pupil.h - star.h) / 2) + star.h * STAR_MASK_OVERFLOW;

      setOffset({
        x: Math.cos(angle) * influence * maxX,
        y: Math.sin(angle) * influence * maxY,
      });
    };

    const handleMouseMove = (event: MouseEvent) => {
      onMove(event.clientX, event.clientY);
    };

    const handleTouchMove = (event: TouchEvent) => {
      const touch = event.touches[0];
      if (touch) onMove(touch.clientX, touch.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [frameRef, pupil.h, pupil.w, star.h, star.w]);

  return (
    <>
      {eye.underLayers.map((layer, index) => (
        <BannerLayer key={`${eye.id}-under-${index}`} layer={layer} />
      ))}
      <div ref={pupilRef} className="absolute overflow-visible" style={layerStyle(pupil)}>
        <CrispImage
          src={pupil.src}
          alt=""
          width={Math.round(pupil.w)}
          height={Math.round(pupil.h)}
          className="pointer-events-none absolute inset-0 h-full w-full max-w-none"
          aria-hidden
        />
        <div
          className="absolute inset-0 overflow-visible"
          style={pupilMaskStyle(pupil.src)}
        >
          <CrispImage
            src={star.src}
            alt=""
            width={Math.round(star.w)}
            height={Math.round(star.h)}
            className="pointer-events-none absolute max-w-none transition-transform duration-100 ease-out"
            style={{
              left: `calc(${starLeft}% + ${(offset.x / pupil.w) * 100}%)`,
              top: `calc(${starTop}% + ${(offset.y / pupil.h) * 100}%)`,
              width: `${starWidth}%`,
              height: `${starHeight}%`,
            }}
            aria-hidden
          />
        </div>
      </div>
      {eye.overlayLayers.map((layer, index) => (
        <BannerLayer key={`${eye.id}-overlay-${index}`} layer={layer} />
      ))}
    </>
  );
}

function MaskedMouth() {
  const { mouth, teethLines } = bannerDiemMouth;
  const teethLeft = ((teethLines.x - mouth.x) / mouth.w) * 100;
  const teethTop = ((teethLines.y - mouth.y) / mouth.h) * 100;
  const teethWidth = (teethLines.w / mouth.w) * 100;
  const teethHeight = (teethLines.h / mouth.h) * 100;

  return (
    <div className="absolute overflow-visible" style={layerStyle(mouth)}>
      <CrispImage
        src={mouth.src}
        alt=""
        width={Math.round(mouth.w)}
        height={Math.round(mouth.h)}
        className="pointer-events-none absolute inset-0 h-full w-full max-w-none"
        aria-hidden
      />
      <div
        className="absolute inset-0 overflow-visible"
        style={mouthMaskStyle(mouth.src)}
      >
        <CrispImage
          src={teethLines.src}
          alt=""
          width={Math.round(teethLines.w)}
          height={Math.round(teethLines.h)}
          className="pointer-events-none absolute max-w-none"
          style={{
            left: `${teethLeft}%`,
            top: `${teethTop}%`,
            width: `${teethWidth}%`,
            height: `${teethHeight}%`,
          }}
          aria-hidden
        />
      </div>
    </div>
  );
}

type BannerDiemProps = {
  className?: string;
};

export function BannerDiem({ className = "" }: BannerDiemProps) {
  const frameRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={frameRef}
      className={`relative h-full w-auto shrink-0 ${className}`.trim()}
      style={{ aspectRatio: `${BANNER_DIEM_W} / ${BANNER_DIEM_H}` }}
      aria-hidden
    >
      {bannerDiemBaseLayersBeforeMouth.map((layer, index) => (
        <BannerLayer key={`base-before-${index}`} layer={layer} />
      ))}
      <MaskedMouth />
      {bannerDiemBaseLayersAfterMouth.map((layer, index) => (
        <BannerLayer key={`base-after-${index}`} layer={layer} />
      ))}
      {bannerDiemEyes.map((eye) => (
        <TrackingEye key={eye.id} eye={eye} frameRef={frameRef} />
      ))}
      {bannerDiemTopLayers.map((layer, index) => (
        <BannerLayer key={`top-${index}`} layer={layer} />
      ))}
    </div>
  );
}

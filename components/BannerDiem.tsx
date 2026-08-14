"use client";

import { useEffect, useId, useRef, useState, type CSSProperties } from "react";
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
      className={`pointer-events-none absolute max-w-none ${layer.className ?? ""} ${className}`.trim()}
      style={layerStyle(layer)}
      aria-hidden
    />
  );
}

function TrackingEye({
  eye,
  gazeX,
  gazeY,
}: {
  eye: BannerDiemEye;
  gazeX: number;
  gazeY: number;
}) {
  const { pupil, star } = eye;
  const starLeft = ((star.x - pupil.x) / pupil.w) * 100;
  const starTop = ((star.y - pupil.y) / pupil.h) * 100;
  const starWidth = (star.w / pupil.w) * 100;
  const starHeight = (star.h / pupil.h) * 100;

  const maxX =
    Math.max(0, (pupil.w - star.w) / 2) + star.w * STAR_MASK_OVERFLOW;
  const maxY =
    Math.max(0, (pupil.h - star.h) / 2) + star.h * STAR_MASK_OVERFLOW;

  const translateX = (gazeX * maxX) / star.w * 100;
  const translateY = (gazeY * maxY) / star.h * 100;

  return (
    <>
      {eye.underLayers.map((layer, index) => (
        <BannerLayer key={`${eye.id}-under-${index}`} layer={layer} />
      ))}
      <div className="absolute overflow-visible" style={layerStyle(pupil)}>
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
            className="pointer-events-none absolute max-w-none [transition:transform_180ms_cubic-bezier(0.22,1,0.36,1)] [will-change:transform]"
            style={{
              left: `${starLeft}%`,
              top: `${starTop}%`,
              width: `${starWidth}%`,
              height: `${starHeight}%`,
              transform: `translate3d(${translateX}%, ${translateY}%, 0)`,
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

const MOUTH_PATH =
  "M7.01499 24.3834C-6.48524 14.7836 2.51468 0.233953 9.01499 2.88352C11.0203 3.70089 13.0221 4.42775 15.0156 5.07074C21.3138 7.10209 27.53 8.29632 33.5156 8.86281C42.9489 9.75561 51.8095 9.08929 59.5156 7.68352C67.4509 6.23595 74.162 4.0043 79.014 1.8835C99.514 -7.07713 112.514 18.3834 95.014 26.8835C87.8476 31.3986 79.6303 34.4484 71.0156 36.159C59.7073 38.4044 47.7144 38.342 36.5156 36.2565C26.752 34.4383 17.592 31.0824 10.0156 26.3773C8.98531 25.7375 7.98427 25.0727 7.01499 24.3834Z";

/** Figma 52:276 tooth strokes, extended along the same vectors so the mask meets the lips. */
const TEETH_PATH =
  "M20.0498 -19.3953L4.9814 50.8434M31.0788 -16.0132L38.9524 61.1325M51.0423 -15.7710L79.4889 59.6135M66.7787 -19.7635L107.2493 48.5305";

function MaskedMouth() {
  const { mouth } = bannerDiemMouth;
  const maskId = `diem-mouth-mask-${useId().replace(/:/g, "")}`;

  return (
    <div className="pointer-events-none absolute" style={layerStyle(mouth)}>
      <svg
        viewBox="0 0 103.202 37.8319"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full overflow-visible"
        aria-hidden
      >
        <defs>
          <mask
            id={maskId}
            maskUnits="userSpaceOnUse"
            x="0"
            y="0"
            width="104"
            height="38"
          >
            <path d={MOUTH_PATH} fill="white" />
          </mask>
        </defs>
        <path d={MOUTH_PATH} fill="white" />
        <path
          d={TEETH_PATH}
          fill="none"
          stroke="#E5E5E5"
          strokeWidth="6"
          strokeLinejoin="round"
          mask={`url(#${maskId})`}
        />
      </svg>
    </div>
  );
}

type BannerDiemProps = {
  className?: string;
};

/**
 * Anchor for gaze direction — midpoint between the two pupils in layer coordinates.
 * Deriving this from the shared eye data keeps the two stars visually locked to the
 * same target instead of each drifting on its own vector.
 */
const GAZE_ANCHOR = (() => {
  const [a, b] = bannerDiemEyes;
  const ax = a.pupil.x + a.pupil.w / 2;
  const ay = a.pupil.y + a.pupil.h / 2;
  const bx = b.pupil.x + b.pupil.w / 2;
  const by = b.pupil.y + b.pupil.h / 2;
  return { x: (ax + bx) / 2, y: (ay + by) / 2 };
})();

/** How far the mouse must travel from the anchor before the stars pin to their extremes. */
const GAZE_SATURATION_RADIUS = 520;

export function BannerDiem({ className = "" }: BannerDiemProps) {
  const frameRef = useRef<HTMLDivElement>(null);
  const [gaze, setGaze] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReducedMotion) return;

    let rafId = 0;
    let pending: { x: number; y: number } | null = null;

    const flush = () => {
      rafId = 0;
      const frame = frameRef.current;
      const point = pending;
      pending = null;
      if (!frame || !point) return;

      const rect = frame.getBoundingClientRect();
      if (rect.width === 0) return;
      const scale = rect.width / BANNER_DIEM_W;
      const anchorX = rect.left + GAZE_ANCHOR.x * scale;
      const anchorY = rect.top + GAZE_ANCHOR.y * scale;

      const dx = point.x - anchorX;
      const dy = point.y - anchorY;
      const distance = Math.hypot(dx, dy);

      /**
       * Smooth radial falloff: `1 - 1/(1 + t)` reaches ~0.5 at t=1 and asymptotes to 1.
       * The stars keep responding subtly even far from the character instead of pinning
       * abruptly at a hard cutoff, which is what made the two eyes read as desynced.
       */
      const t = distance / (GAZE_SATURATION_RADIUS * scale);
      const magnitude = distance === 0 ? 0 : 1 - 1 / (1 + t * 1.4);

      setGaze({
        x: (dx / (distance || 1)) * magnitude,
        y: (dy / (distance || 1)) * magnitude,
      });
    };

    const onMove = (clientX: number, clientY: number) => {
      pending = { x: clientX, y: clientY };
      if (!rafId) rafId = requestAnimationFrame(flush);
    };

    const handleMouseMove = (event: MouseEvent) =>
      onMove(event.clientX, event.clientY);
    const handleTouchMove = (event: TouchEvent) => {
      const touch = event.touches[0];
      if (touch) onMove(touch.clientX, touch.clientY);
    };
    const handleMouseLeave = () => {
      pending = null;
      if (rafId) {
        cancelAnimationFrame(rafId);
        rafId = 0;
      }
      setGaze({ x: 0, y: 0 });
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      ref={frameRef}
      className={`relative w-full overflow-hidden ${className}`.trim()}
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
        <TrackingEye key={eye.id} eye={eye} gazeX={gaze.x} gazeY={gaze.y} />
      ))}
      {bannerDiemTopLayers.map((layer, index) => (
        <BannerLayer key={`top-${index}`} layer={layer} />
      ))}
    </div>
  );
}

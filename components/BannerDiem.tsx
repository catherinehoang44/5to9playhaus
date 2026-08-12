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
        <TrackingEye key={eye.id} eye={eye} gazeX={gaze.x} gazeY={gaze.y} />
      ))}
      {bannerDiemTopLayers.map((layer, index) => (
        <BannerLayer key={`top-${index}`} layer={layer} />
      ))}
    </div>
  );
}

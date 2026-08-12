"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { CrispImage } from "@/components/CrispImage";
import { assets } from "@/lib/assets";

/**
 * 8-frame rotation flipbook of the polymer-clay figurine.
 *
 * Frames are transparent PNGs with the yellow platform padded to the
 * horizontal center, so centering the image on the palm keeps the base
 * locked while the silhouette rotates. `object-contain object-bottom`
 * pins the platform to the palm.
 *
 * Driven by requestAnimationFrame (not setInterval) so background-tab
 * timer throttling doesn't stretch the cadence. Respects
 * prefers-reduced-motion.
 */
type AnimatedFigurineProps = {
  className?: string;
  style?: CSSProperties;
  /** ms per frame. Defaults to 400 ms → 3.2 s per full 360° rotation. */
  frameDurationMs?: number;
};

export function AnimatedFigurine({
  className,
  style,
  frameDurationMs = 400,
}: AnimatedFigurineProps) {
  const frames = assets.figurineFrames;
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReducedMotion) return;

    let rafId = 0;
    let lastFlipAt = performance.now();

    const tick = (now: number) => {
      if (now - lastFlipAt >= frameDurationMs) {
        lastFlipAt = now;
        setActive((i) => (i + 1) % frames.length);
      }
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(rafId);
  }, [frameDurationMs, frames.length]);

  return (
    <div className={`pointer-events-none absolute ${className ?? ""}`.trim()} style={style} aria-hidden>
      {frames.map((src, i) => (
        <CrispImage
          key={src}
          src={src}
          alt=""
          width={440}
          height={640}
          loading={i === 0 ? "eager" : "lazy"}
          fetchPriority={i === 0 ? "high" : "auto"}
          className={`absolute inset-0 h-full w-full object-contain object-bottom transition-opacity duration-0 ${
            i === active ? "opacity-100" : "opacity-0"
          }`}
          aria-hidden
        />
      ))}
    </div>
  );
}

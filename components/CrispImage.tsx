"use client";

import type { DragEvent, ImgHTMLAttributes, MouseEvent } from "react";

function blockImageInteraction(
  event: DragEvent<HTMLImageElement> | MouseEvent<HTMLImageElement>,
) {
  event.preventDefault();
}

type CrispImageProps = ImgHTMLAttributes<HTMLImageElement> & {
  src: string;
  alt: string;
};

/**
 * Native <img> for SVG/PNG illustrations.
 * Skips next/image so assets are not recompressed or downscaled by the optimizer.
 */
export function CrispImage({
  className = "",
  decoding = "async",
  draggable = false,
  onDragStart = blockImageInteraction,
  onContextMenu = blockImageInteraction,
  ...props
}: CrispImageProps) {
  return (
    <img
      {...props}
      draggable={draggable}
      decoding={decoding}
      onDragStart={onDragStart}
      onContextMenu={onContextMenu}
      className={`crisp-image ${className}`.trim()}
    />
  );
}

type CrispFillImageProps = ImgHTMLAttributes<HTMLImageElement> & {
  src: string;
  alt: string;
  loading?: ImgHTMLAttributes<HTMLImageElement>["loading"];
};

/** Fills a relative parent — use instead of next/image `fill`. */
export function CrispFillImage({
  src,
  alt,
  className = "",
  loading = "lazy",
  draggable = false,
  onDragStart = blockImageInteraction,
  onContextMenu = blockImageInteraction,
  ...props
}: CrispFillImageProps) {
  return (
    <img
      {...props}
      src={src}
      alt={alt}
      loading={loading}
      draggable={draggable}
      decoding="async"
      onDragStart={onDragStart}
      onContextMenu={onContextMenu}
      className={`crisp-image absolute inset-0 h-full w-full ${className}`.trim()}
    />
  );
}

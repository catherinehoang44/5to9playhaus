/** Figma banner-diem frame: 634 × 525 (node 93:2340) */
import type { CSSProperties } from "react";

export const BANNER_DIEM_W = 634;
export const BANNER_DIEM_H = 525;

export type BannerDiemLayer = {
  src: string;
  x: number;
  y: number;
  w: number;
  h: number;
};

export type BannerDiemEye = {
  id: "left" | "right";
  /** Layers below pupil/star (e.g. white eye, eyelid shadow) */
  underLayers: BannerDiemLayer[];
  pupil: BannerDiemLayer;
  star: BannerDiemLayer;
  /** Layers rendered above the star within this eye stack */
  overlayLayers: BannerDiemLayer[];
};

export type BannerDiemMouth = {
  mouth: BannerDiemLayer;
  teethLines: BannerDiemLayer;
};

const asset = (name: string) => `/assets/banner-diem/${name}`;

/** Base layers before mouth (paint order). */
export const bannerDiemBaseLayersBeforeMouth: BannerDiemLayer[] = [
  { src: asset("layer-01.svg"), x: 24, y: 24, w: 537.47, h: 516.74 },
  { src: asset("layer-02.svg"), x: 0, y: 0, w: 585.47, h: 585.08 },
  { src: asset("layer-03.svg"), x: 522, y: 34.64, w: 102.87, h: 451.67 },
  { src: asset("layer-04.svg"), x: 26.5, y: 26.5, w: 532.47, h: 505.24 },
  { src: asset("layer-05.svg"), x: 24, y: 24, w: 537.47, h: 510.24 },
  { src: asset("layer-06.svg"), x: 169.78, y: 461.24, w: 166.5, h: 20 },
  { src: asset("layer-07.svg"), x: 101.28, y: 481.24, w: 294, h: 45 },
  { src: asset("layer-08.svg"), x: 146.89, y: 474.88, w: 153.89, h: 65.86 },
  { src: asset("layer-09.svg"), x: 31.31, y: 82.74, w: 455.41, h: 380.5 },
];

/** Base layers after mouth (right eye white). */
export const bannerDiemBaseLayersAfterMouth: BannerDiemLayer[] = [
  { src: asset("layer-12.svg"), x: 200.21, y: 227.74, w: 147.25, h: 151 },
];

/** Figma mask group 93:2358 — teeth lines clipped to mouth shape. */
export const bannerDiemMouth: BannerDiemMouth = {
  mouth: {
    src: asset("mouth.svg"),
    x: 93.76,
    y: 384.36,
    w: 103.2,
    h: 37.83,
  },
  teethLines: {
    src: asset("teeth-lines.svg"),
    x: 83.745,
    y: 385.244,
    w: 84.999,
    h: 36.373,
  },
};

export const bannerDiemEyes: BannerDiemEye[] = [
  {
    id: "right",
    underLayers: [],
    pupil: {
      src: asset("pupil-2.svg"),
      x: 200.65,
      y: 226.82,
      w: 119.46,
      h: 130.55,
    },
    star: {
      src: asset("star-2.svg"),
      x: 221.28,
      y: 261.74,
      w: 62,
      h: 66,
    },
    overlayLayers: [
      { src: asset("layer-13.svg"), x: 229.28, y: 218.09, w: 132, h: 72.65 },
    ],
  },
  {
    id: "left",
    underLayers: [
      { src: asset("layer-14.svg"), x: 35.78, y: 227.74, w: 73.79, h: 64.5 },
      { src: asset("layer-15.svg"), x: 33.9, y: 241.74, w: 78.48, h: 137.38 },
    ],
    pupil: {
      src: asset("pupil-1.svg"),
      x: 37.51,
      y: 241.74,
      w: 73.76,
      h: 113.57,
    },
    star: {
      src: asset("star-1.svg"),
      x: 51.28,
      y: 267.74,
      w: 45,
      h: 61,
    },
    overlayLayers: [],
  },
];

export const bannerDiemTopLayers: BannerDiemLayer[] = [
  { src: asset("layer-16.svg"), x: 235.43, y: 132.39, w: 103.44, h: 57.82 },
  { src: asset("layer-17.svg"), x: 38.95, y: 156.34, w: 58.33, h: 40.99 },
];

export function layerStyle(layer: BannerDiemLayer): CSSProperties {
  return {
    left: `${(layer.x / BANNER_DIEM_W) * 100}%`,
    top: `${(layer.y / BANNER_DIEM_H) * 100}%`,
    width: `${(layer.w / BANNER_DIEM_W) * 100}%`,
    height: `${(layer.h / BANNER_DIEM_H) * 100}%`,
  };
}

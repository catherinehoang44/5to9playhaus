import type { CSSProperties, ReactNode } from "react";
import { DraggableSticker } from "@/components/DraggableSticker";

const DESIGN_W = 1242;
const DESIGN_H = 669;

const BORDER = "#fffaee";
const SWIRL_BORDER = 22;
const SWIRL_INNER = 12;
const SHADOW = "url(#gallery-sticker-shadow)";

function placed(
  left: number,
  top: number,
  width: number,
  height: number,
  rotate: number,
  z: number,
) {
  return {
    rotate,
    style: {
      left: `${(left / DESIGN_W) * 100}%`,
      top: `${(top / DESIGN_H) * 100}%`,
      width: `${(width / DESIGN_W) * 100}%`,
      aspectRatio: `${width} / ${height}`,
      height: "auto",
      zIndex: z,
    } satisfies CSSProperties,
  };
}

const stickerClass = "absolute overflow-visible";
const svgClass = "h-full w-full overflow-visible";

export function StickerShadowDefs() {
  return (
    <svg width="0" height="0" className="absolute" aria-hidden>
      <defs>
        <filter
          id="gallery-sticker-shadow"
          x="-40%"
          y="-40%"
          width="180%"
          height="180%"
        >
          <feDropShadow
            dx="1.5"
            dy="2.5"
            stdDeviation="1.4"
            floodColor="rgb(86 53 41)"
            floodOpacity="0.25"
          />
        </filter>
      </defs>
    </svg>
  );
}

function Rotated({
  deg,
  className = "",
  children,
}: {
  deg?: number;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={`h-full w-full ${className}`.trim()}
      style={deg != null ? { transform: `rotate(${deg}deg)` } : undefined}
    >
      {children}
    </div>
  );
}

const swirlPath =
  "M12 44c0-18 20-34 40-28 14 4 22 20 12 32-8 10-28 8-28-4 0-10 12-14 20-8";

function ClayCoil({
  color = "#c05536",
  flip = false,
}: {
  color?: string;
  flip?: boolean;
}) {
  return (
    <svg viewBox="0 0 90 80" fill="none" overflow="visible" className={svgClass} aria-hidden>
      <g
        filter={SHADOW}
        transform={flip ? "translate(90 5) scale(-1 1)" : "translate(5 5)"}
      >
        <path
          d={swirlPath}
          stroke={BORDER}
          strokeWidth={SWIRL_BORDER}
          strokeLinecap="round"
        />
        <path
          d={swirlPath}
          stroke={color}
          strokeWidth={SWIRL_INNER}
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
}

function StarSparkle() {
  return (
    <svg viewBox="0 0 80 80" fill="none" overflow="visible" className={svgClass} aria-hidden>
      <g filter={SHADOW}>
        <path
          d="M40 10l8 22 22 8-22 8-8 22-8-22-22-8 22-8Z"
          fill="#d8c648"
          stroke={BORDER}
          strokeWidth={SWIRL_BORDER / 2}
          strokeLinejoin="round"
          paintOrder="stroke fill"
        />
      </g>
    </svg>
  );
}

const desktopStickers = [
  {
    id: "swirl-left",
    node: <ClayCoil color="#dea242" flip />,
    ...placed(-12, 492, 88, 78, -18, 16),
  },
  {
    id: "twinkle-mid",
    node: <StarSparkle />,
    ...placed(1157, 157, 64, 64, 18, 16),
  },
  {
    id: "swirl-bl",
    node: <ClayCoil />,
    ...placed(505, 609, 72, 64, -28, 16),
  },
  {
    id: "swirl-right",
    node: <ClayCoil color="#7fa691" flip />,
    ...placed(453, 339, 96, 85, 22, 16),
  },
  {
    id: "twinkle-tr",
    node: <StarSparkle />,
    ...placed(308, 105, 40, 40, 28, 18),
  },
] as const;

export function DesktopCollageStickers() {
  return (
    <>
      {desktopStickers.map(({ id, node, style, rotate }) => (
        <DraggableSticker key={id} className={stickerClass} style={style}>
          <Rotated deg={rotate}>{node}</Rotated>
        </DraggableSticker>
      ))}
    </>
  );
}

export function MobileCollageStickers() {
  return (
    <>
      <DraggableSticker className={`${stickerClass} -left-3 top-[8%] aspect-[90/80] w-[72px]`}>
        <Rotated className="rotate-[18deg]">
          <ClayCoil color="#7fa691" flip />
        </Rotated>
      </DraggableSticker>
      <DraggableSticker className={`${stickerClass} -right-2 -top-3 aspect-square w-[48px]`}>
        <Rotated className="rotate-[16deg]">
          <StarSparkle />
        </Rotated>
      </DraggableSticker>
      <DraggableSticker className={`${stickerClass} left-[12%] -bottom-5 aspect-[90/80] w-[58px]`}>
        <Rotated className="-rotate-[24deg]">
          <ClayCoil />
        </Rotated>
      </DraggableSticker>
    </>
  );
}

export function MobilePhotoStickers() {
  return (
    <>
      <DraggableSticker className={`${stickerClass} -left-4 bottom-[18%] aspect-[90/80] w-[64px]`}>
        <Rotated className="-rotate-[20deg]">
          <ClayCoil color="#dea242" />
        </Rotated>
      </DraggableSticker>
      <DraggableSticker className={`${stickerClass} right-[18%] top-[22%] aspect-square w-[36px]`}>
        <Rotated className="rotate-[22deg]">
          <StarSparkle />
        </Rotated>
      </DraggableSticker>
    </>
  );
}

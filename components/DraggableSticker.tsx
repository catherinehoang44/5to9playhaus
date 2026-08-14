"use client";

import { motion, useMotionValue, useReducedMotion } from "framer-motion";
import {
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";

let topZ = 1;

type Box = { left: number; top: number; width: number; height: number };

type DraggableStickerProps = {
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
};

export function DraggableSticker({
  className = "",
  style,
  children,
}: DraggableStickerProps) {
  const placeholderRef = useRef<HTMLDivElement>(null);
  const constraintsRef = useRef<HTMLElement | null>(null);
  const reduceMotion = useReducedMotion();
  const spin = useMotionValue(0);
  const [box, setBox] = useState<Box | null>(null);
  const [pinned, setPinned] = useState(false);
  const [z, setZ] = useState(1);
  const [playfield, setPlayfield] = useState<HTMLElement | null>(null);

  useLayoutEffect(() => {
    const field = document.getElementById("sticker-playfield");
    constraintsRef.current = field;
    setPlayfield(field);
  }, []);

  useLayoutEffect(() => {
    const placeholder = placeholderRef.current;
    if (!placeholder || pinned) return;

    const measure = () => {
      const field = document.getElementById("sticker-playfield");
      if (!field) return;
      const a = placeholder.getBoundingClientRect();
      const b = field.getBoundingClientRect();
      if (a.width < 2 || a.height < 2) {
        setBox(null);
        return;
      }
      const next = {
        left: a.left - b.left,
        top: a.top - b.top,
        width: a.width,
        height: a.height,
      };
      setBox((prev) => {
        if (
          prev &&
          Math.abs(prev.left - next.left) < 0.5 &&
          Math.abs(prev.top - next.top) < 0.5 &&
          Math.abs(prev.width - next.width) < 0.5 &&
          Math.abs(prev.height - next.height) < 0.5
        ) {
          return prev;
        }
        return next;
      });
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(placeholder);
    window.addEventListener("resize", measure);

    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      measure();
      if (now - start < 1200) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
      cancelAnimationFrame(raf);
    };
  }, [pinned]);

  const sticker =
    box && playfield
      ? createPortal(
          <motion.div
            drag
            dragMomentum={!reduceMotion}
            dragConstraints={constraintsRef}
            dragElastic={reduceMotion ? 0 : 0.18}
            dragTransition={{
              power: 0.5,
              timeConstant: 280,
              bounceStiffness: 220,
              bounceDamping: 18,
            }}
            style={{
              left: box.left,
              top: box.top,
              width: box.width,
              height: box.height,
              zIndex: z,
              cursor: "grab",
              rotate: spin,
            }}
            whileHover={reduceMotion ? undefined : { scale: 1.06 }}
            whileDrag={{ scale: 1.12, cursor: "grabbing" }}
            onDragStart={() => {
              setPinned(true);
              setZ(++topZ);
            }}
            onDrag={(_event, info) => {
              if (reduceMotion) return;
              spin.set(spin.get() + info.delta.x * 0.14);
            }}
            aria-label="Moveable sticker"
            role="img"
            className="pointer-events-auto absolute touch-none select-none"
          >
            {children}
          </motion.div>,
          playfield,
        )
      : null;

  return (
    <>
      <div
        ref={placeholderRef}
        className={className}
        style={{
          ...style,
          visibility: box ? "hidden" : undefined,
        }}
        aria-hidden
      >
        {children}
      </div>
      {sticker}
    </>
  );
}

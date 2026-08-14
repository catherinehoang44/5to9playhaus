"use client";

import { useEffect, useRef } from "react";

/** Full-page layer so collage stickers can be thrown anywhere on the document. */
export function StickerPlayfield() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const sync = () => {
      el.style.height = `${Math.max(
        document.documentElement.scrollHeight,
        document.body.scrollHeight,
      )}px`;
    };

    sync();
    const ro = new ResizeObserver(sync);
    ro.observe(document.body);
    window.addEventListener("resize", sync);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", sync);
    };
  }, []);

  return (
    <div
      id="sticker-playfield"
      ref={ref}
      className="pointer-events-none absolute left-0 top-0 z-[45] w-full"
    />
  );
}

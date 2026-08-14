/** Full-page layer so collage stickers can be thrown anywhere on the document. */
export function StickerPlayfield() {
  return (
    <div
      id="sticker-playfield"
      className="pointer-events-none absolute inset-0 z-[45] overflow-hidden"
    />
  );
}

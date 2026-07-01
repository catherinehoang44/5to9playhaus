import Link from "next/link";

/** Figma nav brand title — node 78:11149 */
export function NavBrandTitle() {
  return (
    <Link
      href="/"
      className="shrink-0 px-1 text-center font-nav-brand text-[42px] leading-normal tracking-[-2.52px] text-[#d8c648] transition-opacity hover:opacity-85"
      aria-label="5 to 9 Playhaus — home"
    >
      <span>5</span>
      <span className="text-[#7fa691]">TO</span>
      <span className="text-[#e67c62]">9P</span>
      <span className="text-[#dea242]">L</span>
      <span>A</span>
      <span className="text-[#7fa691]">Y</span>
      <span>H</span>
      <span className="text-[#7fa691]">A</span>
      <span className="text-[#e67c62]">U</span>
      <span className="text-[#dea242]">S</span>
    </Link>
  );
}

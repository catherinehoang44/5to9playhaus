import Link from "next/link";

type NavBrandTitleProps = {
  align?: "left" | "center";
  className?: string;
};

/** Figma nav brand title — node 78:11149 */
export function NavBrandTitle({
  align = "center",
  className = "",
}: NavBrandTitleProps) {
  const alignClass = align === "left" ? "text-left" : "text-center";

  return (
    <Link
      href="/"
      className={`min-w-0 px-1 font-nav-brand text-heading-nav-brand leading-normal tracking-[-2.52px] text-[#d8c648] transition-opacity hover:opacity-85 ${alignClass} ${className}`.trim()}
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

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CrispImage } from "@/components/CrispImage";
import { assets } from "@/lib/assets";

type NavCenterTitleProps = {
  align?: "left" | "center";
  className?: string;
};

export function NavCenterTitle({
  align = "center",
  className = "",
}: NavCenterTitleProps) {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const alignClass = align === "left" ? "text-left" : "text-center";

  if (!isHome) {
    return (
      <Link
        href="/"
        className={`flex min-w-0 shrink-0 items-center ${className}`.trim()}
        aria-label="5-9 PLAY HAUS — home"
      >
        <CrispImage
          src={assets.navLogo}
          alt="5-9 PLAY HAUS"
          width={466}
          height={497}
          className="h-12 w-auto max-w-none bg-transparent object-contain sm:h-14"
        />
      </Link>
    );
  }

  return (
    <Link
      href="/"
      className={`min-w-0 px-1 font-nav-title text-heading-main-title font-bold uppercase leading-none text-[#cb513c] ${alignClass} ${className}`.trim()}
      aria-label="Polymer Clay Workshops — home"
      onClick={() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}
    >
      Polymer Clay Workshops
    </Link>
  );
}

"use client";

import { usePathname } from "next/navigation";
import { NavBrandTitle } from "@/components/NavBrandTitle";

type NavCenterTitleProps = {
  align?: "left" | "center";
  className?: string;
};

export function NavCenterTitle({
  align = "center",
  className = "",
}: NavCenterTitleProps) {
  const pathname = usePathname();
  const isPrivacy = pathname === "/privacy";
  const alignClass = align === "left" ? "text-left" : "text-center";

  if (isPrivacy) {
    return <NavBrandTitle align={align} className={className} />;
  }

  return (
    <p
      className={`min-w-0 px-1 font-nav-title text-heading-main-title font-bold leading-none text-nav-brown ${alignClass} ${className}`.trim()}
    >
      Polymer Clay Workshops
    </p>
  );
}

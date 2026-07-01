"use client";

import { usePathname } from "next/navigation";
import { NavBrandTitle } from "@/components/NavBrandTitle";

export function NavCenterTitle() {
  const pathname = usePathname();
  const isPrivacy = pathname === "/privacy";

  if (isPrivacy) {
    return <NavBrandTitle />;
  }

  return (
    <p className="shrink-0 px-1 text-center font-nav-title text-[32px] font-bold leading-none text-nav-brown">
      Polymer Clay Workshops
    </p>
  );
}

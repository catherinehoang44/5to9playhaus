"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { CtaLink } from "@/components/CtaLink";
import { NavCenterTitle } from "@/components/NavCenterTitle";

function NavDivider() {
  return (
    <div className="flex min-w-0 flex-1 flex-col gap-1">
      <div className="h-[6px] w-full bg-nav-brown" />
      <div className="h-[3px] w-full bg-nav-brown" />
    </div>
  );
}

/** Minimum width for expanded nav: both CTAs + title + gaps (dividers flex and add no min width). */
function NavExpandedMeasure() {
  return (
    <>
      <CtaLink href="#book" label="Book Now" icon="calendar" />
      <NavCenterTitle align="center" className="shrink-0" />
      <CtaLink
        href="#inquire"
        label="Inquire"
        icon="mail"
        iconPosition="right"
      />
    </>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);
  const measureRef = useRef<HTMLDivElement>(null);
  const [isCompact, setIsCompact] = useState(true);

  const updateLayout = useCallback(() => {
    const nav = navRef.current;
    const measure = measureRef.current;
    if (!nav || !measure) return;

    setIsCompact(measure.scrollWidth > nav.clientWidth);
  }, []);

  useEffect(() => {
    updateLayout();

    const nav = navRef.current;
    const measure = measureRef.current;
    if (!nav || !measure) return;

    const observer = new ResizeObserver(updateLayout);
    observer.observe(nav);
    observer.observe(measure);

    return () => observer.disconnect();
  }, [pathname, updateLayout]);

  return (
    <header className="bg-grid h-nav sticky top-0 z-50 w-full">
      <div className="relative flex h-full w-full items-center px-4 sm:px-6">
        <div
          ref={measureRef}
          aria-hidden
          className="pointer-events-none invisible absolute flex h-0 items-center gap-6 overflow-hidden whitespace-nowrap"
        >
          <NavExpandedMeasure />
        </div>

        <nav
          ref={navRef}
          aria-label="Main navigation"
          className="flex w-full min-w-0 items-center"
        >
          {isCompact ? (
            <div className="flex w-full min-w-0 items-center justify-between gap-4">
              <NavCenterTitle align="left" className="min-w-0 truncate" />
              <CtaLink
                href="#book"
                label="Book Now"
                icon="calendar"
                className="shrink-0"
              />
            </div>
          ) : (
            <div className="flex w-full min-w-0 items-center gap-6">
              <CtaLink href="#book" label="Book Now" icon="calendar" />
              <NavDivider />
              <NavCenterTitle align="center" className="shrink-0" />
              <NavDivider />
              <CtaLink
                href="#inquire"
                label="Inquire"
                icon="mail"
                iconPosition="right"
              />
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}

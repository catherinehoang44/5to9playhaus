import { CtaLink } from "@/components/CtaLink";
import { NavCenterTitle } from "@/components/NavCenterTitle";
import { SiteContainer } from "@/components/SiteContainer";
import { CONTACT_MAILTO, BOOK_NOW_URL } from "@/lib/contact";

export function SiteHeader() {
  return (
    <header className="bg-grid h-nav sticky top-0 z-50 w-full">
      <SiteContainer className="relative flex h-full w-full items-center px-4 sm:px-6">
        <nav
          aria-label="Main navigation"
          className="flex w-full min-w-0 items-center justify-between gap-3 sm:gap-6"
        >
          <NavCenterTitle align="left" className="min-w-0 leading-[1.05]" />
          <div className="grid shrink-0 grid-flow-col items-stretch gap-2 sm:gap-3">
            <CtaLink href={BOOK_NOW_URL} label="Book Now" icon="calendar" />
            <CtaLink
              href={CONTACT_MAILTO}
              label="Email"
              icon="mail"
              iconOnly
            />
          </div>
        </nav>
      </SiteContainer>
    </header>
  );
}

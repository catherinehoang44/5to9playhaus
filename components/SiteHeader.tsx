import { CtaLink } from "@/components/CtaLink";
import { NavCenterTitle } from "@/components/NavCenterTitle";
import { SiteContainer } from "./SiteContainer";

function NavDivider() {
  return (
    <div className="flex min-w-0 flex-1 flex-col gap-1">
      <div className="h-[6px] w-full bg-nav-brown" />
      <div className="h-[3px] w-full bg-nav-brown" />
    </div>
  );
}

export function SiteHeader() {
  return (
    <header className="bg-grid h-nav sticky top-0 z-50">
      <SiteContainer className="flex h-full items-center justify-center px-4 sm:px-6">
        <nav
          aria-label="Main navigation"
          className="flex w-full items-center gap-6"
        >
          <CtaLink href="#book" label="Book Now" icon="calendar" />

          <NavDivider />

          <NavCenterTitle />

          <NavDivider />

          <CtaLink
            href="#inquire"
            label="Inquire"
            icon="mail"
            iconPosition="right"
          />
        </nav>
      </SiteContainer>
    </header>
  );
}

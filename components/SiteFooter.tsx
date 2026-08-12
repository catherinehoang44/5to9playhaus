import Link from "next/link";
import { CrispImage } from "@/components/CrispImage";
import { SiteContainer } from "@/components/SiteContainer";
import { assets } from "@/lib/assets";

const footerLinks = [
  { href: "/", label: "Home" },
  { href: "/privacy", label: "Privacy & Refund Policy" },
  { href: "#contact", label: "Contact" },
] as const;

export function SiteFooter() {
  return (
    <footer className="mt-[var(--section-gap)] flex min-h-[220px] flex-col items-center justify-center border-t-8 border-[#cb513c] bg-[#e68925] py-10 sm:min-h-[286px] sm:py-14">
      <SiteContainer className="flex w-full flex-col items-center gap-6 px-4 sm:gap-[42px] sm:px-6">
        <p className="w-full text-center font-nav-cta text-[clamp(18px,2.5vw+8px,24px)] font-bold italic leading-tight tracking-[-0.04em] text-nav-brown">
          ~* Curator of clay and whimsy *~
        </p>

        <nav
          aria-label="Footer"
          className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3"
        >
          {footerLinks.map(({ href, label }) => (
            <Link
              key={label}
              href={href}
              className="font-nav-cta text-[15px] font-normal leading-none text-nav-brown underline sm:text-[16px]"
            >
              {label}
            </Link>
          ))}
          <Link
            href="#"
            aria-label="Instagram"
            className="inline-flex shrink-0 hover:opacity-80"
          >
            <CrispImage
              src={assets.instagram}
              alt=""
              width={20}
              height={20}
              className="size-5"
              aria-hidden
            />
          </Link>
        </nav>
      </SiteContainer>
    </footer>
  );
}

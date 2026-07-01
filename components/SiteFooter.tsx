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
    <footer className="mt-[var(--section-gap)] flex min-h-[286px] flex-col items-center justify-center border-t-8 border-[#cb513c] bg-[#e68925]">
      <SiteContainer className="flex w-full flex-col items-center gap-[42px] px-4 sm:px-6">
        <p className="w-full text-center font-nav-cta text-[24px] font-bold italic leading-none tracking-[-0.96px] text-nav-brown">
          ~* Curator of clay and whimsy *~
        </p>

        <nav
          aria-label="Footer"
          className="flex flex-wrap items-center justify-center gap-6"
        >
          {footerLinks.map(({ href, label }) => (
            <Link
              key={label}
              href={href}
              className="font-nav-cta text-[16px] font-normal leading-none text-nav-brown underline"
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

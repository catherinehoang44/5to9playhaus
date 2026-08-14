"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ScallopEdge, WaveDivider } from "@/components/ScallopEdge";
import { SiteContainer } from "@/components/SiteContainer";

const INSTAGRAM_URL = "https://www.instagram.com/5to9playhaus/";
const FOOTER_BG = "#cb513c";

const footerLinks = [
  { href: "/", label: "Home" },
  { href: "/privacy", label: "Privacy & Refunds" },
] as const;

export function SiteFooter() {
  const pathname = usePathname();

  return (
    <div className="mt-[var(--section-gap)]">
      <ScallopEdge />
      <footer
        className="relative flex flex-col justify-end pt-8 pb-7 sm:pt-10 sm:pb-7"
        style={{ backgroundColor: FOOTER_BG }}
      >
        <SiteContainer className="relative z-10 flex flex-col gap-6 px-4 sm:px-6">
          <div className="flex min-w-0 flex-col items-start gap-5">
            <div>
              <p className="font-nav-title text-[clamp(40px,7vw,72px)] font-bold uppercase leading-[0.88] text-[#d8c648]">
                Love,
                <span className="block">Diem</span>
              </p>
              <p className="mt-3 font-nav-cta text-description font-bold italic tracking-[-0.04em] text-[#d8c648]">
                Curator of clay and whimsy
              </p>
              <WaveDivider className="mt-4 w-28" color="#d8c648" />
            </div>

            <nav
              aria-label="Footer"
              className="flex flex-wrap items-center gap-x-5 gap-y-2"
            >
              {footerLinks.map(({ href, label }) => (
                <Link
                  key={label}
                  href={href}
                  aria-current={pathname === href ? "page" : undefined}
                  className="font-nav-cta text-[15px] font-bold uppercase leading-none tracking-wide text-[#d8c648] transition-opacity hover:opacity-80"
                >
                  {label}
                </Link>
              ))}
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="font-nav-cta text-[15px] font-bold uppercase leading-none tracking-wide text-[#d8c648] transition-opacity hover:opacity-80"
              >
                Instagram
              </a>
            </nav>
          </div>
        </SiteContainer>
      </footer>
    </div>
  );
}

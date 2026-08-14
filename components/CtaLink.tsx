import Link from "next/link";
import { CrispImage } from "@/components/CrispImage";
import { assets } from "@/lib/assets";

type CtaLinkProps = {
  href: string;
  label: string;
  icon: "calendar" | "mail";
  iconPosition?: "left" | "right";
  iconOnly?: boolean;
  className?: string;
};

export function CtaLink({
  href,
  label,
  icon,
  iconPosition = "left",
  iconOnly = false,
  className = "",
}: CtaLinkProps) {
  const iconSrc =
    icon === "calendar" ? assets.iconCalendar : assets.iconMail;
  const iconSize =
    icon === "calendar"
      ? { width: 18, height: 20, className: "h-5 w-[18px]" }
      : { width: 20, height: 16, className: "h-4 w-5" };

  const iconEl = (
    <CrispImage
      src={iconSrc}
      alt=""
      width={iconSize.width}
      height={iconSize.height}
      className={`shrink-0 ${iconSize.className}`}
      aria-hidden
    />
  );

  const isExternal = href.startsWith("http://") || href.startsWith("https://");

  return (
    <Link
      href={href}
      aria-label={iconOnly ? label : undefined}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className={`cta-link relative isolate flex h-full w-fit shrink-0 items-center justify-center overflow-hidden px-2 py-0 font-nav-cta text-description font-bold uppercase leading-normal min-h-[1lh] ${iconOnly ? "" : "gap-2"} ${className}`.trim()}
    >
      <span className="cta-highlight" aria-hidden />
      {(iconOnly || iconPosition === "left") && iconEl}
      {iconOnly ? null : (
        <span className="relative whitespace-nowrap text-nav-brown">
          {label}
        </span>
      )}
      {!iconOnly && iconPosition === "right" && iconEl}
    </Link>
  );
}

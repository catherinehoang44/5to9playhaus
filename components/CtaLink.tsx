import Link from "next/link";
import { CrispImage } from "@/components/CrispImage";
import { assets } from "@/lib/assets";

type CtaLinkProps = {
  href: string;
  label: string;
  icon: "calendar" | "mail";
  iconPosition?: "left" | "right";
  className?: string;
};

export function CtaLink({
  href,
  label,
  icon,
  iconPosition = "left",
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

  return (
    <Link
      href={href}
      className={`inline-flex w-fit shrink-0 items-center gap-2 bg-nav-mustard px-2 py-0 transition-opacity hover:opacity-85 ${className}`.trim()}
    >
      {iconPosition === "left" && iconEl}
      <span className="font-nav-cta text-description font-bold uppercase leading-normal whitespace-nowrap text-nav-brown">
        {label}
      </span>
      {iconPosition === "right" && iconEl}
    </Link>
  );
}

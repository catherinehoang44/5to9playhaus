import Link from "next/link";

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
};

export function Button({ href, children, className = "" }: ButtonProps) {
  return (
    <Link
      href={href}
      className={`inline-block border border-brown-dark bg-mustard px-4 py-1.5 text-xs font-bold tracking-wider text-brown-dark transition-opacity hover:opacity-80 sm:px-5 sm:py-2 sm:text-sm ${className}`}
    >
      {children}
    </Link>
  );
}

import type { CSSProperties, ReactNode } from "react";

type FadeInSectionProps = {
  children: ReactNode;
  /** Stagger delay in ms */
  delay?: number;
  className?: string;
};

export function FadeInSection({
  children,
  delay = 0,
  className = "",
}: FadeInSectionProps) {
  const style: CSSProperties | undefined =
    delay > 0 ? { animationDelay: `${delay}ms` } : undefined;

  return (
    <div className={`fade-in-section ${className}`.trim()} style={style}>
      {children}
    </div>
  );
}

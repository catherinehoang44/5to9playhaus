type SiteContainerProps = {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
};

/** Constrains content to the site max width (1242px). */
export function SiteContainer({
  children,
  className = "",
  style,
}: SiteContainerProps) {
  return (
    <div className={`site-container ${className}`} style={style}>
      {children}
    </div>
  );
}

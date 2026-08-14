type DashLineProps = {
  className?: string;
  color?: string;
};

/** Full-width solid edge between page and footer. */
export function ScallopEdge({
  className = "",
  color = "#cb513c",
}: DashLineProps) {
  return <DashLine className={`w-full ${className}`.trim()} color={color} />;
}

type WaveDividerProps = DashLineProps;

/** Solid in-content divider. */
export function WaveDivider({
  className = "",
  color = "currentColor",
}: WaveDividerProps) {
  return <DashLine className={className} color={color} />;
}

function DashLine({ className = "", color = "currentColor" }: DashLineProps) {
  return (
    <div
      className={`shrink-0 ${className}`.trim()}
      style={{
        height: "var(--divider-thickness)",
        borderRadius: 9999,
        backgroundColor: color,
      }}
      aria-hidden
    />
  );
}

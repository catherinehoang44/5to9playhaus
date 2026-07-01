type VerticalLabelProps = {
  children: React.ReactNode;
  color?: "orange" | "white";
  className?: string;
};

export function VerticalLabel({
  children,
  color = "orange",
  className = "",
}: VerticalLabelProps) {
  const colorClass =
    color === "white" ? "text-white" : "text-orange-label";

  return (
    <h2
      className={`font-label text-3xl font-bold tracking-widest sm:text-4xl lg:vertical-label lg:text-5xl ${colorClass} ${className}`}
    >
      {children}
    </h2>
  );
}

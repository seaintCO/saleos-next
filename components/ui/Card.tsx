export default function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`glass-card rounded-3xl p-6 ${className}`}
    >
      {children}
    </div>
  );
}
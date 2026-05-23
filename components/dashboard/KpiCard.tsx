interface KpiCardProps {
  title: string;
  value: string | number;
  subtitle: string;
  color: string;
}

export default function KpiCard({
  title,
  value,
  subtitle,
  color,
}: KpiCardProps) {
  return (
    <div className="glass-card rounded-3xl p-6">

      <div className="flex items-center justify-between">

        <p className="text-sm text-zinc-500">
          {title}
        </p>

        <div
          className={`w-11 h-11 rounded-2xl border flex items-center justify-center ${color}`}
        >
          <div className="w-2 h-2 rounded-full bg-current" />
        </div>

      </div>

      <h3 className="text-5xl font-semibold tracking-tight mt-6">
        {value}
      </h3>

      <p className="text-xs mt-4 text-zinc-400">
        {subtitle}
      </p>

    </div>
  );
}
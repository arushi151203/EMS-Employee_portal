function StatCard({
  label,
  value,
  sub,
  icon,
  tone = "info"
}) {
  const toneMap = {
    info: "bg-info/15 text-info",
    success: "bg-success/15 text-success",
    warning: "bg-warning/15 text-warning",
    violet: "bg-chart-5/15 text-chart-5",
    danger: "bg-destructive/15 text-destructive"
  };
  return <div className="rounded-2xl border border-border bg-card p-5 shadow-elegant">
      <div className="flex items-start justify-between gap-3">
        <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
          {label}
        </div>
        {icon && <div className={`grid h-8 w-8 place-items-center rounded-lg ${toneMap[tone]}`}>{icon}</div>}
      </div>
      <div className="mt-4 text-3xl font-semibold tracking-tight">{value}</div>
      {sub && <div className="mt-1 text-xs text-muted-foreground">{sub}</div>}
    </div>;
}
export {
  StatCard
};

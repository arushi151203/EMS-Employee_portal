function StatsCard({ title, value, subtitle, icon }) {
  return (
    <div className="stats-card">
      <div className="stats-left">
        <p className="stats-title">{title}</p>
        <h2 className="stats-value">{value}</h2>
        <span className="stats-subtitle">{subtitle}</span>
      </div>

      <div className="stats-right">
        {icon}
      </div>
    </div>
  );
}

export default StatsCard;
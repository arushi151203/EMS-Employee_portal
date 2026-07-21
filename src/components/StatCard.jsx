function StatCard({ title, number, icon }) {
  return (
    <div className="stat-card">
      <div className="stat-info">
        <p className="stat-title">{title}</p>
        <h2 className="stat-number">{number}</h2>
      </div>

      <div className="stat-icon">
        {icon}
      </div>
    </div>
  );
}

export default StatCard;
function StatsCard({ title, value, color }) {
  return (
    <div className="col-md-3">
      <div className={`card text-white bg-${color}`}>
        <div className="card-body text-center">
          <h6>{title}</h6>
          <h2>{value}</h2>
        </div>
      </div>
    </div>
  );
}

export default StatsCard;
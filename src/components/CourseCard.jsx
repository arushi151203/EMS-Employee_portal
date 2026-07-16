import { Link } from "react-router-dom";

function CourseCard({
  id,
  category,
  status,
  title,
  duration,
  progress,
}) {
  return (
    <div className="course-card">
      <div className="course-top">
        <span className="category">{category}</span>
        <span className="status">{status}</span>
      </div>

      <h3>{title}</h3>

      <p>{duration}</p>

      <div className="progress-text">
        <span>Progress</span>
        <span>{progress}% Complete</span>
      </div>

      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      <Link to={`/course/${id}`}>
      <button className="continue-btn">
        Continue Learning
        </button>
      </Link>
    </div>
  );
}

export default CourseCard;
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function CourseCard({ image, title, instructor, progress, color }) {
  const [courseProgress, setCourseProgress] = useState(progress);
  const navigate = useNavigate();

  return (
    <div className="col-md-4 mb-4">
      <div className="card h-100">
        <img src={image} className="card-img-top" alt={title} />

        <div className="card-body">
          <h5>{title}</h5>

          <p>Instructor: {instructor}</p>

          <div className="progress">
            <div
              className={`progress-bar bg-${color}`}
              style={{ width: `${courseProgress}%` }}
            >
              {courseProgress}%
            </div>
          </div>

          <button
            className="btn btn-primary w-100 mt-3"
            onClick={() => {
              setCourseProgress(
                courseProgress < 100 ? courseProgress + 10 : 100
              );
              navigate("/course");
            }}
          >
            Continue Learning
          </button>
        </div>
      </div>
    </div>
  );
}

export default CourseCard;
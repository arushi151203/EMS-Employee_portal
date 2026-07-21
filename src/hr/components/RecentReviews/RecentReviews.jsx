import { recentReviews } from "../../data/performanceData";
import "./RecentReviews.css";

const RecentReviews = () => {
  return (
    <div className="reviews-card">
      <h2>Recent Reviews</h2>
      <p>Latest employee performance reviews</p>

      <table className="reviews-table">
        <thead>
          <tr>
            <th>Employee</th>
            <th>Department</th>
            <th>Reviewer</th>
            <th>Rating</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>
          {recentReviews.map((review) => (
            <tr key={review.id}>
              <td>{review.employee}</td>
              <td>{review.department}</td>
              <td>{review.reviewer}</td>
              <td>⭐ {review.rating}</td>

              <td>
                <span
                  className={
                    review.status === "Completed"
                      ? "status completed"
                      : "status pending"
                  }
                >
                  {review.status}
                </span>
              </td>

              <td>{review.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecentReviews;
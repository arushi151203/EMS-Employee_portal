import "../styles/Attendance.css";
import AttendanceStatus from "../components/Attendance/AttendanceStatus";
import AttendanceCalendar from "../components/Attendance/AttendanceCalendar";
import AttendanceHistory from "../components/Attendance/AttendanceHistory";

function Attendance() {
  return (
    <div>
      <main className="page-content">

        <div className="page-header">

          <h1 className="page-title">
            Attendance
          </h1>

          <p className="page-subtitle">
            Track your attendance and working hours
          </p>

        </div>

        <div className="dashboard-grid">

          <AttendanceStatus />

          <AttendanceCalendar />

        </div>

        <div className="table-section">

          <AttendanceHistory />

        </div>

      </main>

    </div>
  );
}

export default Attendance;
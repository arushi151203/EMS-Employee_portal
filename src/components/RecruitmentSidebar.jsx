import {
  FaChartPie,
  FaUsers,
  FaCalendarCheck,
  FaBriefcase,
  FaBuilding,
  FaChartLine,
} from "react-icons/fa";
import "../css/recruitmentSidebar.css";

function RecruitmentSidebar() {
  return (
    <div className="recruitment-sidebar">
      <div className="sidebar-header">
        <h2>Nexus HR</h2>
        <p>Employee Portal</p>
      </div>

      <ul className="sidebar-menu">
        <li>
          <FaChartPie />
          <span>Overview</span>
        </li>

        <li>
          <FaUsers />
          <span>Employees</span>
        </li>

        <li>
          <FaCalendarCheck />
          <span>Leave Approval</span>
        </li>

        <li className="active">
          <FaBriefcase />
          <span>Recruitment</span>
        </li>

        <li>
          <FaBuilding />
          <span>Department</span>
        </li>

        <li>
          <FaChartLine />
          <span>Performance</span>
        </li>
      </ul>
    </div>
  );
}

export default RecruitmentSidebar;
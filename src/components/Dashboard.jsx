import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import StatsCard from "./StatsCard";
import "../css/dashboard.css";

import {
  BsBook,
  BsCheckCircle,
  BsClock,
  BsAward,
} from "react-icons/bs";
import CourseCard from "./CourseCard";

function Dashboard() {
  return (
    <div className="dashboard-container">
      <Sidebar />

      <div className="main-content">
        <Navbar />

        <div className="page-header">
          <h1>Training</h1>
          <p>Courses, certifications, and learning paths</p>
        </div>

        <div className="stats-container">

  <StatsCard
    title="COURSES ENROLLED"
    value="4"
    icon={<BsBook size={24} />}
  />

  <StatsCard
    title="COMPLETED"
    value="1"
    icon={<BsCheckCircle size={24} />}
  />

  <StatsCard
    title="HOURS LEARNED"
    value="18.5h"
    icon={<BsClock size={24} />}
  />

  <StatsCard
    title="CERTIFICATES"
    value="2"
    icon={<BsAward size={24} />}
  />

</div>

        <h2 className="section-title">Current Courses</h2>

<div className="course-container">

  <CourseCard
    id={1}
    category="Technical"
    status="in progress"
    title="Advanced React Patterns"
    duration="8h total"
    progress={75}
  />

  <CourseCard
    id={2}
    category="Soft skills"
    status="completed"
    title="Leadership Fundamentals"
    duration="4h total"
    progress={100}
  />

  <CourseCard
    id={3}
    category="Compliance"
    status="in progress"
    title="Security Best Practices"
    duration="3h total"
    progress={30}
  />
  <CourseCard
  id={4}
  category="Analytics"
  status="not started"
  title="Data-Driven-Decision Making"
  duration="6h total"
  progress={0}
/>

</div>

        {/* Learning Paths */}

      </div>
    </div>
  );
}

export default Dashboard;
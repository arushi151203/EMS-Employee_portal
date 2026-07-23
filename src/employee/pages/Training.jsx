import StatsCard from "../components/training/StatsCard";
import CourseCard from "../components/training/CourseCard";
import "../css/training-dashboard.css";
import {
  BsBook,
  BsCheckCircle,
  BsClock,
  BsAward,
} from "react-icons/bs";

export default function Training() {
  return (
    <div className="training-module">
      <div className="page-header">
        <h1>Training</h1>
        <p>Courses, certifications, and learning paths</p>
      </div>
      <div className="stats-container">
        <StatsCard title="COURSES ENROLLED" value="4" icon={<BsBook size={20} />} iconColor="icon-blue" />
        <StatsCard title="COMPLETED" value="1" icon={<BsCheckCircle size={20} />} iconColor="icon-green" />
        <StatsCard title="HOURS LEARNED" value="18.5h" icon={<BsClock size={20} />} iconColor="icon-purple" />
        <StatsCard title="CERTIFICATES" value="2" icon={<BsAward size={20} />} iconColor="icon-orange" />
      </div>
      <h2 className="section-title">Current Courses</h2>
      <div className="course-container">
        <CourseCard id={1} category="Technical" status="in progress" title="Advanced React Patterns" duration="8h total" progress={75} />
        <CourseCard id={2} category="Soft skills" status="completed" title="Leadership Fundamentals" duration="4h total" progress={100} />
        <CourseCard id={3} category="Compliance" status="in progress" title="Security Best Practices" duration="3h total" progress={30} />
        <CourseCard id={4} category="Analytics" status="not started" title="Data-Driven-Decision Making" duration="6h total" progress={0} />
      </div>
    </div>
  );
}
import { useState } from "react";
import Navbar from "./Navbar";
import StatsCard from "./StatsCard";
import CourseCard from "./CourseCard";

function Dashboard() {
  const [search, setSearch] = useState("");

  const courses = [
    {
      image: "https://picsum.photos/400/200?1",
      title: "HTML & CSS",
      instructor: "John",
      progress: 90,
      color: "success",
    },
    {
      image: "https://picsum.photos/400/200?2",
      title: "JavaScript",
      instructor: "David",
      progress: 70,
      color: "info",
    },
    {
      image: "https://picsum.photos/400/200?3",
      title: "React JS",
      instructor: "Sarah",
      progress: 45,
      color: "warning",
    },
    {
      image: "https://picsum.photos/400/200?4",
      title: "Node JS",
      instructor: "Alex",
      progress: 20,
      color: "danger",
    },
    {
      image: "https://picsum.photos/400/200?5",
      title: "Python",
      instructor: "Emma",
      progress: 100,
      color: "success",
    },
    {
      image: "https://picsum.photos/400/200?6",
      title: "Data Structures",
      instructor: "James",
      progress: 60,
      color: "primary",
    },
  ];

  return (
    <div className="container py-4">
      <Navbar />

      <div className="row g-4">
        <StatsCard title="Total Courses" value="6" color="primary" />
        <StatsCard title="Completed" value="1" color="success" />
        <StatsCard title="Ongoing" value="4" color="warning" />
        <StatsCard title="Certificates" value="1" color="danger" />
      </div>

      <h3 className="mt-5 mb-3">My Courses</h3>

      <input
        type="text"
        className="form-control mb-4"
        placeholder="Search courses..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="row">
        {courses
          .filter((course) =>
            course.title.toLowerCase().includes(search.toLowerCase())
          )
          .map((course) => (
            <CourseCard
              key={course.title}
              image={course.image}
              title={course.title}
              instructor={course.instructor}
              progress={course.progress}
              color={course.color}
            />
          ))}
      </div>
    </div>
  );
}

export default Dashboard;
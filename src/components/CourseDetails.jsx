import { useParams } from "react-router-dom";
import courses from "../data/courses";

function CourseDetails() {
  const { id } = useParams();

  const course = courses.find((c) => c.id === Number(id));

  if (!course) return <h2>Course Not Found</h2>;

  return (
    <div className="course-details">
      <h1>{course.title}</h1>
      <p><strong>Instructor:</strong> {course.instructor}</p>
      <p><strong>Duration:</strong> {course.duration}</p>
      <p><strong>Lessons:</strong> {course.lessons}</p>
      <p><strong>Progress:</strong> {course.progress}%</p>

      <h3>Description</h3>
      <p>{course.description}</p>
    </div>
  );
}

export default CourseDetails;
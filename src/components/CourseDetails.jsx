import { useParams } from "react-router-dom";

function CourseDetails() {
  const { id } = useParams();

  return (
    <div style={{ padding: "40px", color: "white" }}>
      <h1>Course {id}</h1>
      <p>This is the Course Details page.</p>
    </div>
  );
}

export default CourseDetails;
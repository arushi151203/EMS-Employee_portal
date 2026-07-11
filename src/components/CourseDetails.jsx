import { useParams } from "react-router-dom";

function CourseDetails() {

  const { id } = useParams();

  const courseData = {
    react: {
      title: "React Basics",
      topics: [
        "JSX Introduction",
        "Components",
        "Props",
        "State Management",
        "React Hooks"
      ]
    },

    javascript: {
      title: "JavaScript",
      topics: [
        "Variables",
        "Functions",
        "Arrays",
        "Objects",
        "ES6 Concepts"
      ]
    },

    "html-css": {
      title: "HTML & CSS",
      topics: [
        "HTML Tags",
        "Forms",
        "CSS Styling",
        "Flexbox",
        "Responsive Design"
      ]
    },

    python: {
      title: "Python Basics",
      topics: [
        "Python Syntax",
        "Data Types",
        "Loops",
        "Functions",
        "File Handling"
      ]
    },

    database: {
      title: "Database",
      topics: [
        "SQL Basics",
        "Tables",
        "Queries",
        "Database Design",
        "Joins"
      ]
    },

    git: {
      title: "Git & GitHub",
      topics: [
        "Git Commands",
        "Repositories",
        "Branches",
        "Commits",
        "GitHub Upload"
      ]
    }
  };

  const course = courseData[id];

  return (
    <div className="container mt-5">

      <h2>{course.title}</h2>

      <p>Continue learning this course by completing the topics below.</p>

      <div className="card p-3">
        <h4>Course Topics</h4>

        <ul>
          {course.topics.map((topic, index) => (
            <li key={index}>{topic}</li>
          ))}
        </ul>

        <button className="btn btn-success">
          Start Lesson
        </button>

      </div>

    </div>
  );
}

export default CourseDetails;
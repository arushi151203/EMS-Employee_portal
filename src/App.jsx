import { Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import CourseDetails from "./components/CourseDetails";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/course/:id" element={<CourseDetails />} />
    </Routes>
  );
}

export default App;
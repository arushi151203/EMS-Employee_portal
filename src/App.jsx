import { Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import CourseDetails from "./components/CourseDetails";
import UrlShortener from "./components/UrlShortener";
import RecruitmentDashboard from "./components/RecruitmentDashboard";
import JobDetails from "./components/JobDetails";
import CandidateDetails from "./components/CandidateDetails";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/course/:id" element={<CourseDetails />} />
      <Route path="/url-shortener" element={<UrlShortener />} />
      <Route path="/job/:id" element={<JobDetails />} />
      <Route path="/candidate/:id" element={<CandidateDetails />} />

      {/* New Recruitment Page */}
      <Route
        path="/recruitment"
        element={<RecruitmentDashboard />}
      />
    </Routes>
  );
}

export default App;
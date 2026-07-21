import { useNavigate } from "react-router-dom";
import RecruitmentSidebar from "./RecruitmentSidebar";
import Navbar from "./Navbar";
import StatCard from "./StatCard";
import "../css/recruitment.css";
import "../css/recruitmentSidebar.css";

function RecruitmentDashboard() {
  const navigate = useNavigate();
  return (
    <div className="recruitment-page">
      <RecruitmentSidebar />

      <div className="main-content">
        <Navbar />

        <div className="recruitment-content">

          <div className="page-header">
            <div>
              <h1>Recruitment</h1>
              <p>Job openings and candidate pipeline</p>
            </div>

            <button className="post-btn">
              + Post Job
            </button>
          </div>


            <div className="stats-container">

            <StatCard 
              title="TOTAL CANDIDATES"
              number="41"
              icon="👥"
            />

            <StatCard 
              title="OPEN ROLES"
              number="4"
              icon="💼"
            />

            <StatCard 
              title="INTERVIEWS THIS WEEK"
              number="6"
              icon="📅"
            />

            <StatCard 
              title="OFFERS EXTENDED"
              number="2"
              icon="✅"
            />

          </div>
          </div>



          <div className="jobs-section">
  <h2>Active Job Openings</h2>

  <div className="job-card">
  <div className="job-info">
    <h3>Senior Frontend Engineer</h3>
    <p>Engineering • Posted June 15</p>
  </div>

  <div className="job-actions">
    <span>12 Candidates</span>
    <span className="status interviewing">Interviewing</span>
    <button onClick={() => navigate("/job/1")}>
      View
    </button>
  </div>
</div>

  <div className="job-card">
  <div className="job-info">
    <h3>UX Researcher</h3>
    <p>Design • Posted June 20</p>
  </div>

  <div className="job-actions">
    <span>8 Candidates</span>
    <span className="status screening">Screening</span>
    <button onClick={()=> navigate("/job/2")}>
      View
      </button>
  </div>
</div>

<div className="job-card">
  <div className="job-info">
    <h3>Growth Marketing Manager</h3>
    <p>Marketing • Posted June 15</p>
  </div>

  <div className="job-actions">
    <span>15 Candidates</span>
    <span className="status offer">Offer</span>
    <button onClick={() => navigate("/job/3")}>
      View
      </button>
  </div>
</div>

<div className="job-card">
  <div className="job-info">
    <h3>Data Engineer</h3>
    <p>Analytics • Posted June 28</p>
  </div>

  <div className="job-actions">
    <span>6 Candidates</span>
    <span className="status applied">Applied</span>
    <button onClick={() => navigate("/job/4")}>
      View
      </button>
  </div>
</div>


          <div className="pipeline-section">
  <h2>Candidate Pipeline</h2>

  <div className="pipeline-stats">
    <StatCard title="Applied" number="18" icon="📄" />
    <StatCard title="Screening" number="12" icon="🔍" />
    <StatCard title="Interview" number="8" icon="🎤" />
    <StatCard title="Offers" number="3" icon="🎉" />
  </div>

  <div className="candidate-card">
  <div className="candidate-info">
    <h3>Emily Rodriguez</h3>
    <p>Senior Backend Engineer</p>
  </div>

  <span className="candidate-status interviewing">
    Interviewing
  </span>
</div>

<div className="candidate-card">
  <div className="candidate-info">
    <h3>David Kim</h3>
    <p>UX Researcher</p>
  </div>

  <span className="candidate-status screening">
    Screening
  </span>
</div>

<div className="candidate-card">
  <div className="candidate-info">
    <h3>Priya Nair</h3>
    <p>Growth Marketing</p>
  </div>

  <span className="candidate-status offer">
    Offer
  </span>
</div>
</div>


        </div>
      </div>
    </div>
  );
}

export default RecruitmentDashboard;
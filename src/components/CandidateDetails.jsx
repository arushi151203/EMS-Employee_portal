import { useParams, Link } from "react-router-dom";
import "../css/jobDetails.css";

function CandidateDetails() {
  const { id } = useParams();

  const candidates = {
    1: {
      name: "Emily Rodriguez",
      age: 27,
      phone: "+91 9876543210",
      email: "emily.rodriguez@gmail.com",
      education: "B.Tech Computer Science",
      experience: "5 Years",
      skills: "React, JavaScript, HTML, CSS, REST API",
      company: "Infosys",
      ctc: "8 LPA",
      expected: "11 LPA",
      notice: "30 Days",
      status: "Interviewing",
    },
    2: {
      name: "David Kim",
      age: 29,
      phone: "+91 9876543211",
      email: "david.kim@gmail.com",
      education: "B.Tech Information Technology",
      experience: "4 Years",
      skills: "React, Node.js, MongoDB",
      company: "TCS",
      ctc: "7 LPA",
      expected: "10 LPA",
      notice: "45 Days",
      status: "Interviewing",
    },
    3: {
      name: "Priya Nair",
      age: 28,
      phone: "+91 9876543212",
      email: "priya.nair@gmail.com",
      education: "B.Tech Computer Science",
      experience: "6 Years",
      skills: "React, TypeScript, Redux",
      company: "Accenture",
      ctc: "9 LPA",
      expected: "12 LPA",
      notice: "30 Days",
      status: "Interviewing",
    },
  };

  const candidate = candidates[id];

  if (!candidate) {
    return <h2>Candidate Not Found</h2>;
  }

  return (
    <div className="job-details">
      <Link to="/recruitment">
        <button className="back-btn">← Back</button>
      </Link>

      <h1>{candidate.name}</h1>

      <div className="job-info">
        <div className="info-card">
          <h4>Age</h4>
          <p>{candidate.age}</p>
        </div>

        <div className="info-card">
          <h4>Phone</h4>
          <p>{candidate.phone}</p>
        </div>

        <div className="info-card">
          <h4>Email</h4>
          <p>{candidate.email}</p>
        </div>

        <div className="info-card">
          <h4>Education</h4>
          <p>{candidate.education}</p>
        </div>

        <div className="info-card">
          <h4>Experience</h4>
          <p>{candidate.experience}</p>
        </div>

        <div className="info-card">
          <h4>Skills</h4>
          <p>{candidate.skills}</p>
        </div>

        <div className="info-card">
          <h4>Current Company</h4>
          <p>{candidate.company}</p>
        </div>

        <div className="info-card">
          <h4>Current CTC</h4>
          <p>{candidate.ctc}</p>
        </div>

        <div className="info-card">
          <h4>Expected CTC</h4>
          <p>{candidate.expected}</p>
        </div>

        <div className="info-card">
          <h4>Notice Period</h4>
          <p>{candidate.notice}</p>
        </div>

        <div className="info-card">
          <h4>Interview Status</h4>
          <p>{candidate.status}</p>
        </div>
      </div>
    </div>
  );
}

export default CandidateDetails;
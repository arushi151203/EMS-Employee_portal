import { useParams, Link, useNavigate } from "react-router-dom";
import "../css/jobDetails.css";

function JobDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const jobs = {
    "1": {
      title: "Senior Frontend Engineer",
      department: "Engineering",
      posted: "June 15",
      totalCandidates: 12,
      status: "Interviewing",
      candidates: [
        {
          name: "Emily Rodriguez",
          experience: "5 Years",
          email: "emily.rodriguez@gmail.com",
          stage: "Interviewing",
        },
        {
          name: "David Kim",
          experience: "4 Years",
          email: "david.kim@gmail.com",
          stage: "Interviewing",
        },
        {
          name: "Priya Nair",
          experience: "6 Years",
          email: "priya.nair@gmail.com",
          stage: "Interviewing",
        },
        {
          name: "Michael Chen",
          experience: "5 Years",
          email: "michael.chen@gmail.com",
          stage: "Interviewing",
        },
        {
          name: "Sarah Wilson",
          experience: "3 Years",
          email: "sarah.wilson@gmail.com",
          stage: "Interviewing",
        },
        {
          name: "James Brown",
          experience: "7 Years",
          email: "james.brown@gmail.com",
          stage: "Interviewing",
        },
        {
          name: "Olivia Davis",
          experience: "4 Years",
          email: "olivia.davis@gmail.com",
          stage: "Interviewing",
        },
        {
          name: "Ethan Miller",
          experience: "5 Years",
          email: "ethan.miller@gmail.com",
          stage: "Interviewing",
        },
        {
          name: "Sophia Taylor",
          experience: "2 Years",
          email: "sophia.taylor@gmail.com",
          stage: "Interviewing",
        },
        {
          name: "Noah Garcia",
          experience: "6 Years",
          email: "noah.garcia@gmail.com",
          stage: "Interviewing",
        },
        {
          name: "Ava Thomas",
          experience: "4 Years",
          email: "ava.thomas@gmail.com",
          stage: "Interviewing",
        },
        {
          name: "Liam Anderson",
          experience: "5 Years",
          email: "liam.anderson@gmail.com",
          stage: "Interviewing",
        },
      ],
    },

    "2": {
      title: "UX Researcher",
      department: "Design",
      posted: "June 20",
      totalCandidates: 8,
      status: "Screening",
      candidates: [
        {
          name: "Ananya Sharma",
          experience: "3 Years",
          email: "ananya.sharma@gmail.com",
          stage: "Screening",
        },
        {
          name: "Robert Lee",
          experience: "4 Years",
          email: "robert.lee@gmail.com",
          stage: "Screening",
        },
        {
          name: "Grace Hall",
          experience: "2 Years",
          email: "grace.hall@gmail.com",
          stage: "Screening",
        },
        {
          name: "Kevin White",
          experience: "5 Years",
          email: "kevin.white@gmail.com",
          stage: "Screening",
        },
        {
          name: "Natalie Scott",
          experience: "3 Years",
          email: "natalie.scott@gmail.com",
          stage: "Screening",
        },
        {
          name: "Daniel Young",
          experience: "4 Years",
          email: "daniel.young@gmail.com",
          stage: "Screening",
        },
        {
          name: "Isabella Moore",
          experience: "5 Years",
          email: "isabella.moore@gmail.com",
          stage: "Screening",
        },
        {
          name: "Arjun Verma",
          experience: "3 Years",
          email: "arjun.verma@gmail.com",
          stage: "Screening",
        },
      ],
    },
    "3": {
      title: "Growth Marketing Manager",
      department: "Marketing",
      posted: "June 15",
      totalCandidates: 15,
      status: "Offer",
      candidates: [
        {
          name: "Aisha Khan",
          experience: "6 Years",
          email: "aisha.khan@gmail.com",
          stage: "Offer",
        },
        {
          name: "Rahul Mehta",
          experience: "5 Years",
          email: "rahul.mehta@gmail.com",
          stage: "Offer",
        },
        {
          name: "Sneha Kapoor",
          experience: "4 Years",
          email: "sneha.kapoor@gmail.com",
          stage: "Offer",
        },
        {
          name: "John Carter",
          experience: "7 Years",
          email: "john.carter@gmail.com",
          stage: "Offer",
        },
        {
          name: "Emma Watson",
          experience: "3 Years",
          email: "emma.watson@gmail.com",
          stage: "Offer",
        },
        {
          name: "Chris Evans",
          experience: "5 Years",
          email: "chris.evans@gmail.com",
          stage: "Offer",
        },
        {
          name: "Neha Gupta",
          experience: "4 Years",
          email: "neha.gupta@gmail.com",
          stage: "Offer",
        },
        {
          name: "Aryan Singh",
          experience: "6 Years",
          email: "aryan.singh@gmail.com",
          stage: "Offer",
        },
        {
          name: "Olivia Green",
          experience: "3 Years",
          email: "olivia.green@gmail.com",
          stage: "Offer",
        },
        {
          name: "Daniel Martin",
          experience: "5 Years",
          email: "daniel.martin@gmail.com",
          stage: "Offer",
        },
        {
          name: "Sophia Lewis",
          experience: "4 Years",
          email: "sophia.lewis@gmail.com",
          stage: "Offer",
        },
        {
          name: "William Clark",
          experience: "6 Years",
          email: "william.clark@gmail.com",
          stage: "Offer",
        },
        {
          name: "Riya Sharma",
          experience: "2 Years",
          email: "riya.sharma@gmail.com",
          stage: "Offer",
        },
        {
          name: "Kabir Jain",
          experience: "5 Years",
          email: "kabir.jain@gmail.com",
          stage: "Offer",
        },
        {
          name: "Mia Adams",
          experience: "3 Years",
          email: "mia.adams@gmail.com",
          stage: "Offer",
        },
      ],
    },

    "4": {
  title: "Data Engineer",
  department: "Analytics",
  posted: "June 28",
  totalCandidates: 6,
  status: "Applied",
  candidates: [
    {
      name: "Harsh Verma",
      experience: "4 Years",
      email: "harsh.verma@gmail.com",
      stage: "Applied",
    },
    {
      name: "Aarav Patel",
      experience: "5 Years",
      email: "aarav.patel@gmail.com",
      stage: "Applied",
    },
    {
      name: "Meera Joshi",
      experience: "3 Years",
      email: "meera.joshi@gmail.com",
      stage: "Applied",
    },
    {
      name: "Ryan Cooper",
      experience: "6 Years",
      email: "ryan.cooper@gmail.com",
      stage: "Applied",
    },
    {
      name: "Nisha Rao",
      experience: "4 Years",
      email: "nisha.rao@gmail.com",
      stage: "Applied",
    },
    {
      name: "Lucas Hill",
      experience: "5 Years",
      email: "lucas.hill@gmail.com",
      stage: "Applied",
    },
  ],
},
};

const job = jobs[id];

if (!job) {
  return <h2>Job Not Found</h2>;
}

return (
    <div className="job-details">
      <Link to="/recruitment">
        <button className="back-btn">← Back to Recruitment</button>
      </Link>

      <div className="job-header">
        <h1>{job.title}</h1>
        <span className="job-status">{job.status}</span>
      </div>

      <div className="job-info">
        <div className="info-card">
          <h4>Department</h4>
          <p>{job.department}</p>
        </div>

        <div className="info-card">
          <h4>Posted On</h4>
          <p>{job.posted}</p>
        </div>

        <div className="info-card">
          <h4>Total Candidates</h4>
          <p>{job.totalCandidates}</p>
        </div>

        <div className="info-card">
          <h4>Current Status</h4>
          <p>{job.status}</p>
        </div>
      </div>

      <h2>Candidate Pipeline</h2>

      <table className="candidate-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Experience</th>
            <th>Email</th>
            <th>Status</th>
            <th>Resume</th>
          </tr>
        </thead>

        <tbody>
          {job.candidates.map((candidate, index) => (
            <tr key={index}>
              <td>{candidate.name}</td>
              <td>{candidate.experience}</td>
              <td>{candidate.email}</td>
              <td>
                <span className="status-badge">
                  {candidate.stage}
                </span>
              </td>
              <td>
  <button
    className="resume-btn"
    onClick={() => navigate(`/candidate/${index + 1}`)}
  >
    View Resume
  </button>
</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default JobDetails;
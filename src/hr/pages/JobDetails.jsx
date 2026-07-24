import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { jobs, candidates } from "../data/recruitmentData";

function JobDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const job = jobs.find((j) => j.id === Number(id));

  if (!job) {
    return <h2 className="text-lg">Job not found.</h2>;
  }

  const jobCandidates = candidates.filter((c) => c.jobId === job.id);

  return (
    <div>
      <Link to="/hr/recruitment" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6">
        <ArrowLeft className="h-4 w-4" /> Back to Recruitment
      </Link>

      <div className="flex items-center gap-3 mb-6">
        <h1 className="text-2xl font-bold">{job.title}</h1>
        <span className="text-xs font-medium px-3 py-1 rounded-full bg-blue-500/15 text-blue-400">
          {job.status}
        </span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="rounded-xl border border-border bg-card p-4">
          <h4 className="text-xs text-muted-foreground uppercase mb-1">Department</h4>
          <p className="font-medium">{job.department}</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4">
          <h4 className="text-xs text-muted-foreground uppercase mb-1">Posted On</h4>
          <p className="font-medium">{job.posted}</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4">
          <h4 className="text-xs text-muted-foreground uppercase mb-1">Total Candidates</h4>
          <p className="font-medium">{jobCandidates.length}</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4">
          <h4 className="text-xs text-muted-foreground uppercase mb-1">Current Status</h4>
          <p className="font-medium">{job.status}</p>
        </div>
      </div>

      <h2 className="text-lg font-semibold mb-4">Candidate Pipeline</h2>
      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-muted/50 text-left">
              <th className="p-3 font-medium">Name</th>
              <th className="p-3 font-medium">Experience</th>
              <th className="p-3 font-medium">Email</th>
              <th className="p-3 font-medium">Status</th>
              <th className="p-3 font-medium">Resume</th>
            </tr>
          </thead>
          <tbody>
            {jobCandidates.map((c) => (
              <tr key={c.id} className="border-t border-border">
                <td className="p-3">{c.name}</td>
                <td className="p-3">{c.experience}</td>
                <td className="p-3 text-muted-foreground">{c.email}</td>
                <td className="p-3">
                  <span className="text-xs font-medium px-3 py-1 rounded-full bg-blue-500/15 text-blue-400">
                    {c.stage}
                  </span>
                </td>
                <td className="p-3">
                  <button
                    onClick={() => navigate(`/hr/candidate/${c.id}`)}
                    className="rounded-lg bg-primary text-primary-foreground px-3 py-1.5 text-xs font-medium hover:opacity-90"
                  >
                    View Resume
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default JobDetails;
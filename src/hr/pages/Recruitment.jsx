import { useNavigate } from "react-router-dom";
import { Users, Briefcase, CalendarClock, CheckCircle2 } from "lucide-react";
import StatCard from "../components/recruitment/StatCard";
import { jobs, candidates } from "../data/recruitmentData";

const statusStyles = {
  Interviewing: "bg-blue-500/15 text-blue-400",
  Screening: "bg-yellow-500/15 text-yellow-400",
  Offer: "bg-green-500/15 text-green-400",
  Applied: "bg-muted text-muted-foreground",
};

function Recruitment() {
  const navigate = useNavigate();

  const pipelineCounts = candidates.reduce((acc, c) => {
    acc[c.stage] = (acc[c.stage] || 0) + 1;
    return acc;
  }, {});

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Recruitment</h1>
          <p className="text-sm text-muted-foreground mt-1">Job openings and candidate pipeline</p>
        </div>
        <button className="rounded-lg bg-primary text-primary-foreground px-4 py-2 text-sm font-medium hover:opacity-90">
          + Post Job
        </button>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-8">
        <StatCard title="Total Candidates" number={candidates.length} icon={Users} />
        <StatCard title="Open Roles" number={jobs.length} icon={Briefcase} />
        <StatCard title="Interviews This Week" number={pipelineCounts["Interviewing"] || 0} icon={CalendarClock} />
        <StatCard title="Offers Extended" number={pipelineCounts["Offer"] || 0} icon={CheckCircle2} />
      </div>

      <h2 className="text-lg font-semibold mb-4">Active Job Openings</h2>
      <div className="space-y-3 mb-8">
        {jobs.map((job) => (
          <div
            key={job.id}
            className="flex items-center justify-between rounded-xl border border-border bg-card p-4"
          >
            <div>
              <h3 className="font-medium">{job.title}</h3>
              <p className="text-sm text-muted-foreground mt-1">{job.department} • Posted {job.posted}</p>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">{job.candidateIds.length} Candidates</span>
              <span className={`text-xs font-medium px-3 py-1 rounded-full ${statusStyles[job.status]}`}>
                {job.status}
              </span>
              <button
                onClick={() => navigate(`/hr/job/${job.id}`)}
                className="rounded-lg border border-border px-3 py-1.5 text-sm hover:bg-accent"
              >
                View
              </button>
            </div>
          </div>
        ))}
      </div>

      <h2 className="text-lg font-semibold mb-4">Candidate Pipeline</h2>
     <div className="grid grid-cols-4 gap-4 mb-8">
        <StatCard title="Applied" number={pipelineCounts["Applied"] || 0} icon={Users} tint="bg-muted/40" />
        <StatCard title="Screening" number={pipelineCounts["Screening"] || 0} icon={Users} tint="bg-yellow-500/10" />
        <StatCard title="Interview" number={pipelineCounts["Interviewing"] || 0} icon={Users} tint="bg-blue-500/10" />
        <StatCard title="Offers" number={pipelineCounts["Offer"] || 0} icon={Users} tint="bg-green-500/10" />
     </div>

      <div className="space-y-3">
        {candidates.slice(0, 6).map((c) => (
          <div
            key={c.id}
            className="flex items-center justify-between rounded-xl border border-border bg-card p-4 cursor-pointer hover:bg-accent"
            onClick={() => navigate(`/hr/candidate/${c.id}`)}
          >
            <div>
              <h3 className="font-medium">{c.name}</h3>
              <p className="text-sm text-muted-foreground mt-1">
                {jobs.find((j) => j.id === c.jobId)?.title}
              </p>
            </div>
            <span className={`text-xs font-medium px-3 py-1 rounded-full ${statusStyles[c.stage]}`}>
              {c.stage}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Recruitment;
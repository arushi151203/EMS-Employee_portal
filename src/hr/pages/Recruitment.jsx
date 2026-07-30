import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Users, Briefcase, CalendarClock, CheckCircle2 } from "lucide-react";
import { StatCard } from "@/components/common/StatCard";
import { StatusPill } from "@/components/common/StatusPill";
import { Button } from "@/components/ui/button";
import { jobs, candidates } from "../data/recruitmentData";

const stageTone = {
  Interviewing: "info",
  Screening: "warning",
  Offer: "success",
  Applied: "muted",
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
        <Button onClick={() => toast("Post Job requires backend integration")}>+ Post Job</Button>
      </div>

      <div className="grid grid-cols-1 gap-4 mb-8 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Candidates" value={candidates.length} icon={<Users size={16} />} />
        <StatCard label="Open Roles" value={jobs.length} icon={<Briefcase size={16} />} />
        <StatCard label="Interviews This Week" value={pipelineCounts["Interviewing"] || 0} icon={<CalendarClock size={16} />} />
        <StatCard label="Offers Extended" value={pipelineCounts["Offer"] || 0} icon={<CheckCircle2 size={16} />} tone="success" />
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
              <StatusPill status={job.status.toLowerCase()} tone={stageTone[job.status]} />
              <Button variant="outline" size="sm" onClick={() => navigate(`/hr/job/${job.id}`)}>
                View
              </Button>
            </div>
          </div>
        ))}
      </div>

      <h2 className="text-lg font-semibold mb-4">Candidate Pipeline</h2>
      <div className="grid grid-cols-1 gap-4 mb-8 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Applied" value={pipelineCounts["Applied"] || 0} icon={<Users size={16} />} />
        <StatCard label="Screening" value={pipelineCounts["Screening"] || 0} icon={<Users size={16} />} tone="warning" />
        <StatCard label="Interview" value={pipelineCounts["Interviewing"] || 0} icon={<Users size={16} />} tone="info" />
        <StatCard label="Offers" value={pipelineCounts["Offer"] || 0} icon={<Users size={16} />} tone="success" />
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
            <StatusPill status={c.stage.toLowerCase()} tone={stageTone[c.stage]} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Recruitment;
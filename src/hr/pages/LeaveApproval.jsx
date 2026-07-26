import { useState, useEffect } from "react";
import { toast } from "sonner";
import { CalendarCheck, Clock, CheckCircle2, XCircle } from "lucide-react";
import { StatCard } from "@/components/common/StatCard";
import { StatusPill } from "@/components/common/StatusPill";
import { getAllLeaves, reviewLeave } from "@/employee/services/leaveService";

function daysBetween(start, end) {
  const ms = new Date(end) - new Date(start);
  return Math.round(ms / (1000 * 60 * 60 * 24)) + 1;
}

export default function LeaveApproval() {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState(null);
  const [filter, setFilter] = useState("Pending");

  async function loadLeaves() {
    setLoading(true);
    try {
      const res = await getAllLeaves();
      setLeaves(res.data);
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Could not load leave requests");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadLeaves();
  }, []);

  async function handleReview(id, decision) {
    setProcessingId(id);
    try {
      const res = await reviewLeave(id, decision);
      toast.success(res.data.message);
      loadLeaves();
    } catch (err) {
      toast.error(err.response?.data?.message || "Action failed");
    } finally {
      setProcessingId(null);
    }
  }

  const pendingCount = leaves.filter((l) => l.status === "Pending").length;
  const approvedCount = leaves.filter((l) => l.status === "Approved").length;
  const rejectedCount = leaves.filter((l) => l.status === "Rejected").length;

  const visible = filter === "All" ? leaves : leaves.filter((l) => l.status === filter);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Leave Approval</h1>
        <p className="text-sm text-muted-foreground mt-1">Review and act on employee leave requests</p>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-8">
        <StatCard label="Pending" value={pendingCount} icon={<Clock size={16} />} tone="warning" />
        <StatCard label="Approved" value={approvedCount} icon={<CheckCircle2 size={16} />} tone="success" />
        <StatCard label="Rejected" value={rejectedCount} icon={<XCircle size={16} />} tone="danger" />
      </div>

      <div className="flex items-center gap-2 mb-4">
        {["Pending", "Approved", "Rejected", "All"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`rounded-lg px-3 py-1.5 text-sm font-medium transition ${
              filter === f ? "bg-primary text-primary-foreground" : "border border-border text-muted-foreground hover:bg-accent"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="text-sm text-muted-foreground">Loading...</p>
      ) : visible.length === 0 ? (
        <div className="rounded-xl border border-border bg-card p-6 text-center text-sm text-muted-foreground">
          <CalendarCheck className="mx-auto mb-2 h-6 w-6 text-muted-foreground" />
          No {filter !== "All" ? filter.toLowerCase() : ""} leave requests.
        </div>
      ) : (
        <div className="space-y-3">
          {visible.map((l) => (
            <div key={l.id} className="flex items-center justify-between rounded-xl border border-border bg-card p-4">
              <div>
                <h3 className="font-medium">{l.employee_name || l.employee_id}</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {l.leave_type} • {new Date(l.start_date).toLocaleDateString()} – {new Date(l.end_date).toLocaleDateString()}
                  {" "}({daysBetween(l.start_date, l.end_date)} day{daysBetween(l.start_date, l.end_date) > 1 ? "s" : ""})
                </p>
                {l.reason && <p className="text-sm text-muted-foreground mt-1">"{l.reason}"</p>}
              </div>
              <div className="flex items-center gap-3">
                <StatusPill status={l.status.toLowerCase()} />
                {l.status === "Pending" && (
                  <>
                    <button
                      disabled={processingId === l.id}
                      onClick={() => handleReview(l.id, "Approved")}
                      className="rounded-lg bg-success/15 text-success border border-success/25 px-3 py-1.5 text-sm font-medium hover:opacity-80 disabled:opacity-50"
                    >
                      Approve
                    </button>
                    <button
                      disabled={processingId === l.id}
                      onClick={() => handleReview(l.id, "Rejected")}
                      className="rounded-lg bg-destructive/15 text-destructive border border-destructive/25 px-3 py-1.5 text-sm font-medium hover:opacity-80 disabled:opacity-50"
                    >
                      Reject
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
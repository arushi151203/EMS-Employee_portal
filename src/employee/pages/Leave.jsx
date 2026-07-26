import { useState, useEffect } from "react";
import { toast } from "sonner";
import { CalendarDays, Clock, CheckCircle2, XCircle } from "lucide-react";
import { StatCard } from "@/components/common/StatCard";
import { StatusPill } from "@/components/common/StatusPill";
import { getUser } from "@/lib/auth";
import { applyLeave, getMyLeaves } from "../services/leaveService";

const leaveTypes = ["Casual", "Sick", "Annual", "Unpaid"];

function daysBetween(start, end) {
  const ms = new Date(end) - new Date(start);
  return Math.round(ms / (1000 * 60 * 60 * 24)) + 1;
}

export default function Leave() {
  const employeeId = getUser()?.employee_id;

  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [leaveType, setLeaveType] = useState(leaveTypes[0]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reason, setReason] = useState("");

  async function loadLeaves() {
    if (!employeeId) return;
    setLoading(true);
    try {
      const res = await getMyLeaves(employeeId);
      setLeaves(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Could not load your leave history");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadLeaves();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!startDate || !endDate) {
      toast.error("Please select both start and end dates");
      return;
    }

    setIsSubmitting(true);
    try {
      await applyLeave({
        employee_id: employeeId,
        leave_type: leaveType,
        start_date: startDate,
        end_date: endDate,
        reason,
      });
      toast.success("Leave request submitted");
      setStartDate("");
      setEndDate("");
      setReason("");
      loadLeaves();
    } catch (err) {
      toast.error(err.response?.data?.message || "Could not submit leave request");
    } finally {
      setIsSubmitting(false);
    }
  }

  const pendingCount = leaves.filter((l) => l.status === "Pending").length;
  const approvedCount = leaves.filter((l) => l.status === "Approved").length;
  const rejectedCount = leaves.filter((l) => l.status === "Rejected").length;

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Leave</h1>
        <p className="text-sm text-muted-foreground mt-1">Apply for leave and track your requests</p>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-8">
        <StatCard label="Pending" value={pendingCount} icon={<Clock size={16} />} tone="warning" />
        <StatCard label="Approved" value={approvedCount} icon={<CheckCircle2 size={16} />} tone="success" />
        <StatCard label="Rejected" value={rejectedCount} icon={<XCircle size={16} />} tone="danger" />
      </div>

      <div className="grid grid-cols-3 gap-6">

        {/* Apply form */}
        <form onSubmit={handleSubmit} className="rounded-2xl border border-border bg-card p-5 space-y-4 h-fit">
          <h2 className="font-semibold flex items-center gap-2">
            <CalendarDays size={18} /> Apply for Leave
          </h2>

          <div>
            <label className="text-xs font-medium text-muted-foreground">Leave Type</label>
            <select
              value={leaveType}
              onChange={(e) => setLeaveType(e.target.value)}
              className="mt-1 w-full rounded-lg bg-input border border-border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring/60"
            >
              {leaveTypes.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-muted-foreground">Start Date</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="mt-1 w-full rounded-lg bg-input border border-border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring/60"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground">End Date</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="mt-1 w-full rounded-lg bg-input border border-border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring/60"
              />
            </div>
          </div>

          {startDate && endDate && new Date(endDate) >= new Date(startDate) && (
            <p className="text-xs text-muted-foreground">{daysBetween(startDate, endDate)} day(s)</p>
          )}

          <div>
            <label className="text-xs font-medium text-muted-foreground">Reason (optional)</label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              rows={3}
              className="mt-1 w-full rounded-lg bg-input border border-border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring/60"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-lg bg-primary text-primary-foreground py-2.5 text-sm font-medium hover:opacity-90 disabled:opacity-60"
          >
            {isSubmitting ? "Submitting..." : "Submit Request"}
          </button>
        </form>

        {/* History */}
        <div className="col-span-2 rounded-2xl border border-border bg-card overflow-hidden h-fit">
          <div className="p-5 border-b border-border">
            <h2 className="font-semibold">Your Requests</h2>
          </div>

          {loading ? (
            <p className="p-5 text-sm text-muted-foreground">Loading...</p>
          ) : leaves.length === 0 ? (
            <p className="p-5 text-sm text-muted-foreground">No leave requests yet.</p>
          ) : (
            <table className="w-full text-sm">
              <thead className="bg-surface text-muted-foreground text-left">
                <tr>
                  <th className="px-4 py-3 font-medium">Type</th>
                  <th className="px-4 py-3 font-medium">Dates</th>
                  <th className="px-4 py-3 font-medium">Days</th>
                  <th className="px-4 py-3 font-medium">Reason</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {leaves.map((l) => (
                  <tr key={l.id} className="border-t border-border">
                    <td className="px-4 py-3">{l.leave_type}</td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {new Date(l.start_date).toLocaleDateString()} – {new Date(l.end_date).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3">{daysBetween(l.start_date, l.end_date)}</td>
                    <td className="px-4 py-3 text-muted-foreground">{l.reason || "—"}</td>
                    <td className="px-4 py-3">
                      <StatusPill status={l.status.toLowerCase()} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
import { useState, useEffect, useMemo } from "react";
import { toast } from "sonner";
import { Plus, X } from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { StatusPill } from "@/components/common/StatusPill";
import { getUser } from "@/lib/auth";
import { applyLeave, getMyLeaves } from "../services/leaveService";

const LEAVE_POLICY = {
  Annual: { allowance: 20, color: "#3B82F6" },
  Sick: { allowance: 10, color: "#EF4444" },
  Personal: { allowance: 5, color: "#A78BFA" },
  "Comp Off": { allowance: 3, color: "#34D399" },
};

const leaveTypes = Object.keys(LEAVE_POLICY);

function daysBetween(start, end) {
  const ms = new Date(end) - new Date(start);
  return Math.round(ms / (1000 * 60 * 60 * 24)) + 1;
}

function typeBadgeClasses(type) {
  const color = LEAVE_POLICY[type]?.color || "#94A3B8";
  return { backgroundColor: `${color}26`, color };
}

export default function Leave() {
  const employeeId = getUser()?.employee_id;

  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showModal, setShowModal] = useState(false);

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
    if (new Date(endDate) < new Date(startDate)) {
      toast.error("End date can't be before start date");
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
      setShowModal(false);
      loadLeaves();
    } catch (err) {
      toast.error(err.response?.data?.message || "Could not submit leave request");
    } finally {
      setIsSubmitting(false);
    }
  }

  const currentYear = new Date().getFullYear();

  // Balances: sum of days used per type, from Approved requests this year
  const usedByType = useMemo(() => {
    const totals = {};
    leaveTypes.forEach((t) => (totals[t] = 0));
    leaves.forEach((l) => {
      if (l.status === "Approved" && new Date(l.start_date).getFullYear() === currentYear) {
        totals[l.leave_type] = (totals[l.leave_type] || 0) + daysBetween(l.start_date, l.end_date);
      }
    });
    return totals;
  }, [leaves, currentYear]);

  // Monthly usage chart data, grouped by type (Approved only)
  const monthlyUsage = useMemo(() => {
    const months = Array.from({ length: 12 }, (_, i) => {
      const label = new Date(currentYear, i, 1).toLocaleString("default", { month: "short" });
      const row = { month: label };
      leaveTypes.forEach((t) => (row[t] = 0));
      return row;
    });

    leaves.forEach((l) => {
      if (l.status !== "Approved") return;
      const d = new Date(l.start_date);
      if (d.getFullYear() !== currentYear) return;
      months[d.getMonth()][l.leave_type] += daysBetween(l.start_date, l.end_date);
    });

    return months;
  }, [leaves, currentYear]);

  return (
    <div>
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold">Leave Management</h1>
          <p className="text-sm text-muted-foreground mt-1">Apply for leave and track your balance</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-1.5 rounded-lg bg-primary text-primary-foreground px-4 py-2 text-sm font-medium hover:opacity-90"
        >
          <Plus size={16} /> Apply for Leave
        </button>
      </div>

      {/* Balance cards */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        {leaveTypes.map((type) => {
          const { allowance, color } = LEAVE_POLICY[type];
          const used = usedByType[type] || 0;
          const remaining = Math.max(allowance - used, 0);
          const pct = Math.min((used / allowance) * 100, 100);
          return (
            <div key={type} className="rounded-2xl border border-border bg-card p-5">
              <p className="text-sm text-muted-foreground">{type} Leave</p>
              <p className="mt-2 text-2xl font-bold">
                {remaining} <span className="text-base font-normal text-muted-foreground">/ {allowance}d</span>
              </p>
              <div className="mt-3 h-1.5 w-full rounded-full bg-muted overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{ width: `${pct}%`, backgroundColor: color }}
                />
              </div>
              <p className="mt-1.5 text-xs text-muted-foreground">{used} used</p>
            </div>
          );
        })}
      </div>

      {/* History */}
      <div className="rounded-2xl border border-border bg-card overflow-hidden mb-8">
        <div className="p-5 border-b border-border">
          <h2 className="font-semibold">Leave History</h2>
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
                <th className="px-4 py-3 font-medium">Applied</th>
                <th className="px-4 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {leaves.map((l) => (
                <tr key={l.id} className="border-t border-border">
                  <td className="px-4 py-3">
                    <span
                      className="rounded-md px-2 py-0.5 text-xs font-medium"
                      style={typeBadgeClasses(l.leave_type)}
                    >
                      {l.leave_type}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {new Date(l.start_date).toLocaleDateString()}
                    {l.start_date !== l.end_date && ` – ${new Date(l.end_date).toLocaleDateString()}`}
                  </td>
                  <td className="px-4 py-3">{daysBetween(l.start_date, l.end_date)}</td>
                  <td className="px-4 py-3 text-muted-foreground">{l.reason || "—"}</td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {new Date(l.applied_at).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3">
                    <StatusPill status={l.status.toLowerCase()} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Usage chart */}
      <div className="rounded-2xl border border-border bg-card p-6">
        <h2 className="font-semibold mb-4">Leave Usage — {currentYear}</h2>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={monthlyUsage}>
            <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" />
            <XAxis dataKey="month" stroke="var(--muted-foreground)" fontSize={12} />
            <YAxis stroke="var(--muted-foreground)" fontSize={12} allowDecimals={false} />
            <Tooltip />
            <Legend />
            {leaveTypes.map((type) => (
              <Bar key={type} dataKey={type} stackId="leave" fill={LEAVE_POLICY[type].color} />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Apply for Leave modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-md rounded-2xl border border-border bg-card p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-lg">Apply for Leave</h2>
              <button onClick={() => setShowModal(false)} className="text-muted-foreground hover:text-foreground">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
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
          </div>
        </div>
      )}
    </div>
  );
}
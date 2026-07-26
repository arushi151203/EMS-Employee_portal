import { useEffect, useState } from "react";
import { Users, UserCheck, UserX, Clock } from "lucide-react";
import { toast } from "sonner";
import { StatusPill } from "@/components/common/StatusPill";
import { getUser } from "@/lib/auth";
import { getPendingApprovals, getAllEmployees, reviewSignup } from "@/lib/authService";

function StatCard({ title, number, icon: Icon }) {
  return (
    <div className="rounded-xl border border-border bg-card p-4 flex items-center justify-between">
      <div>
        <p className="text-sm text-muted-foreground">{title}</p>
        <p className="text-2xl font-bold mt-1">{number}</p>
      </div>
      <Icon className="h-8 w-8 text-muted-foreground" />
    </div>
  );
}

function Employees() {
  const currentUser = getUser();
  const [pending, setPending] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState(null);

  async function loadData() {
    setLoading(true);
    try {
      const [pendingRes, employeesRes] = await Promise.all([
        getPendingApprovals(),
        getAllEmployees(),
      ]);
      setPending(pendingRes.data);
      setEmployees(employeesRes.data);
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Could not load employees");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  async function handleReview(id, decision) {
    setProcessingId(id);
    try {
      const res = await reviewSignup(id, decision);
      toast.success(res.data.message);
      loadData();
    } catch (err) {
      toast.error(err.response?.data?.message || "Action failed");
    } finally {
      setProcessingId(null);
    }
  }

  const activeCount = employees.filter((e) => e.approval_status === "Approved").length;
  const rejectedCount = employees.filter((e) => e.approval_status === "Rejected").length;

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Employees</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Manage employee accounts and review new signups
        </p>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-8">
        <StatCard title="Total Accounts" number={employees.length} icon={Users} />
        <StatCard title="Pending Approval" number={pending.length} icon={Clock} />
        <StatCard title="Active" number={activeCount} icon={UserCheck} />
        <StatCard title="Rejected" number={rejectedCount} icon={UserX} />
      </div>

      {/* Pending approvals */}
      <h2 className="text-lg font-semibold mb-4">Pending Signups</h2>

      {loading ? (
        <p className="text-sm text-muted-foreground mb-8">Loading...</p>
      ) : pending.length === 0 ? (
        <div className="rounded-xl border border-border bg-card p-6 text-center text-sm text-muted-foreground mb-8">
          No signups waiting for review.
        </div>
      ) : (
        <div className="space-y-3 mb-8">
          {pending.map((p) => (
            <div
              key={p.id}
              className="flex items-center justify-between rounded-xl border border-border bg-card p-4"
            >
              <div>
                <h3 className="font-medium">{p.name}</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {p.email} • {p.employee_id} • <span className="capitalize">{p.role}</span>
                </p>
              </div>
              <div className="flex items-center gap-3">
                <StatusPill status="pending" />
                {currentUser?.role !== "admin" && p.role === "hr" ? (
                  <span className="text-xs text-muted-foreground">Only Admin can review HR signups</span>
                ) : (
                  <>
                    <button
                      disabled={processingId === p.id}
                      onClick={() => handleReview(p.id, "Approved")}
                      className="rounded-lg bg-success/15 text-success border border-success/25 px-3 py-1.5 text-sm font-medium hover:opacity-80 disabled:opacity-50"
                    >
                      Approve
                    </button>
                    <button
                      disabled={processingId === p.id}
                      onClick={() => handleReview(p.id, "Rejected")}
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

      {/* Full directory */}
      <h2 className="text-lg font-semibold mb-4">All Employees</h2>

      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-surface text-muted-foreground text-left">
            <tr>
              <th className="px-4 py-3 font-medium">Name</th>
              <th className="px-4 py-3 font-medium">Employee ID</th>
              <th className="px-4 py-3 font-medium">Role</th>
              <th className="px-4 py-3 font-medium">Department</th>
              <th className="px-4 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((e) => (
              <tr key={e.id} className="border-t border-border">
                <td className="px-4 py-3">{e.name}</td>
                <td className="px-4 py-3 text-muted-foreground">{e.employee_id}</td>
                <td className="px-4 py-3 capitalize">{e.role}</td>
                <td className="px-4 py-3 text-muted-foreground">{e.department || "—"}</td>
                <td className="px-4 py-3">
                  <StatusPill status={e.approval_status.toLowerCase()} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Employees;
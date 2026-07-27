import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Building2, Plus, Pencil, X } from "lucide-react";
import { getDepartments, createDepartment, updateDepartment } from "../services/departmentsService";

function formatBudget(value) {
  if (value === null || value === undefined) return "—";
  const num = Number(value);
  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`;
  if (num >= 1_000) return `${(num / 1_000).toFixed(1)}K`;
  return `${num}`;
}

export default function Departments() {
  const navigate = useNavigate();
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [editingDept, setEditingDept] = useState(null); // null = creating new
  const [name, setName] = useState("");
  const [headName, setHeadName] = useState("");
  const [budget, setBudget] = useState("");

  async function loadDepartments() {
    setLoading(true);
    try {
      const res = await getDepartments();
      setDepartments(res.data);
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Could not load departments");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadDepartments();
  }, []);

  function openCreateModal() {
    setEditingDept(null);
    setName("");
    setHeadName("");
    setBudget("");
    setShowModal(true);
  }

  function openEditModal(dept) {
    setEditingDept(dept);
    setName(dept.name);
    setHeadName(dept.head_name || "");
    setBudget(dept.budget || "");
    setShowModal(true);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("Department name is required");
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = { name: name.trim(), head_name: headName.trim() || null, budget: budget || null };
      if (editingDept) {
        await updateDepartment(editingDept.id, payload);
        toast.success("Department updated");
      } else {
        await createDepartment(payload);
        toast.success("Department created");
      }
      setShowModal(false);
      loadDepartments();
    } catch (err) {
      toast.error(err.response?.data?.message || "Could not save department");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div>
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold">Departments</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage teams and organizational structure</p>
        </div>
        <button
          onClick={openCreateModal}
          className="flex items-center gap-1.5 rounded-lg bg-primary text-primary-foreground px-4 py-2 text-sm font-medium hover:opacity-90"
        >
          <Plus size={16} /> New Department
        </button>
      </div>

      {loading ? (
        <p className="text-sm text-muted-foreground">Loading...</p>
      ) : departments.length === 0 ? (
        <div className="rounded-xl border border-border bg-card p-6 text-center text-sm text-muted-foreground">
          No departments yet. Add one to get started.
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-5">
          {departments.map((d) => (
            <div key={d.id} className="rounded-2xl border border-border bg-card p-5">
              <div className="flex items-start justify-between">
                <div className="h-10 w-10 rounded-lg bg-primary/15 text-primary flex items-center justify-center">
                  <Building2 size={20} />
                </div>
              </div>

              <h3 className="mt-4 text-lg font-semibold">{d.name}</h3>
              <p className="text-sm text-muted-foreground">
                Head: {d.head_name || "Unassigned"}
              </p>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <div>
                  <p className="text-xl font-bold">{d.employee_count}</p>
                  <p className="text-xs text-muted-foreground">Employees</p>
                </div>
                <div>
                  <p className="text-xl font-bold">{formatBudget(d.budget)}</p>
                  <p className="text-xs text-muted-foreground">Budget</p>
                </div>
              </div>

              <div className="mt-4 flex items-center gap-2">
                <button
                  onClick={() => navigate("/hr/employees")}
                  className="flex-1 rounded-lg border border-border py-2 text-sm font-medium hover:bg-accent"
                >
                  View Team
                </button>
                <button
                  onClick={() => openEditModal(d)}
                  className="h-9 w-9 rounded-lg border border-border flex items-center justify-center hover:bg-accent"
                >
                  <Pencil size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-md rounded-2xl border border-border bg-card p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-lg">{editingDept ? "Edit Department" : "New Department"}</h2>
              <button onClick={() => setShowModal(false)} className="text-muted-foreground hover:text-foreground">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-medium text-muted-foreground">Department Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 w-full rounded-lg bg-input border border-border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring/60"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-muted-foreground">Department Head</label>
                <input
                  type="text"
                  value={headName}
                  onChange={(e) => setHeadName(e.target.value)}
                  className="mt-1 w-full rounded-lg bg-input border border-border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring/60"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-muted-foreground">Budget ($)</label>
                <input
                  type="number"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="mt-1 w-full rounded-lg bg-input border border-border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring/60"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-lg bg-primary text-primary-foreground py-2.5 text-sm font-medium hover:opacity-90 disabled:opacity-60"
              >
                {isSubmitting ? "Saving..." : editingDept ? "Save Changes" : "Create Department"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
import { useState } from "react";
import { toast } from "sonner";
import { Pencil, Trash2, Check, UserPlus, X } from "lucide-react";
import { users as initialUsers, rolePermissions } from "../data/userManagementData";

const roleStyles = {
  Employee: "bg-blue-500/15 text-blue-400",
  "HR Manager": "bg-purple-500/15 text-purple-400",
  Admin: "bg-red-500/15 text-red-400",
};

const avatarColors = ["bg-blue-500", "bg-purple-500", "bg-orange-500", "bg-violet-500", "bg-teal-500", "bg-pink-500"];

function getInitials(name) {
  return name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
}

function UserManagement() {
  const [users, setUsers] = useState(initialUsers);
  const [showModal, setShowModal] = useState(false);

  const [name, setName] = useState("");
  const [role, setRole] = useState("Employee");
  const [dept, setDept] = useState("");

  const resetForm = () => {
    setName("");
    setRole("Employee");
    setDept("");
  };

  const handleAddUser = () => {
    if (!name.trim()) {
      toast.error("Enter a user name");
      return;
    }
    if (!dept.trim()) {
      toast.error("Enter a department");
      return;
    }

    const newUser = {
      id: users.length + 1,
      name: name.trim(),
      initials: getInitials(name.trim()),
      color: avatarColors[users.length % avatarColors.length],
      role,
      dept: dept.trim(),
      lastLogin: "Never",
      mfa: false,
      status: "Active",
    };

    setUsers([...users, newUser]);
    setShowModal(false);
    resetForm();
    toast.success(`${newUser.name} added successfully`);
  };

  const handleDelete = (id) => {
    setUsers(users.filter((u) => u.id !== id));
    toast.success("User removed");
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">User Management</h1>
          <p className="text-sm text-muted-foreground mt-1">Roles, permissions, and access control</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 rounded-lg bg-primary text-primary-foreground px-4 py-2 text-sm font-medium hover:opacity-90"
        >
          <UserPlus size={16} /> Add User
        </button>
      </div>

      <div className="rounded-2xl border border-border bg-card overflow-hidden mb-8">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-muted/50 text-left text-muted-foreground">
              <th className="p-3 font-medium">User</th>
              <th className="p-3 font-medium">Role</th>
              <th className="p-3 font-medium">Dept</th>
              <th className="p-3 font-medium">Last Login</th>
              <th className="p-3 font-medium">MFA</th>
              <th className="p-3 font-medium">Status</th>
              <th className="p-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-t border-border">
                <td className="p-3">
                  <div className="flex items-center gap-3">
                    <div className={`grid h-8 w-8 place-items-center rounded-full text-xs font-medium text-white ${u.color}`}>
                      {u.initials}
                    </div>
                    <span className="font-medium">{u.name}</span>
                  </div>
                </td>
                <td className="p-3">
                  <span className={`text-xs font-medium px-3 py-1 rounded-full ${roleStyles[u.role]}`}>{u.role}</span>
                </td>
                <td className="p-3 text-muted-foreground">{u.dept}</td>
                <td className="p-3 text-muted-foreground">{u.lastLogin}</td>
                <td className="p-3">
                  <span className={`text-xs font-medium px-3 py-1 rounded-full ${u.mfa ? "bg-green-500/15 text-green-400" : "bg-red-500/15 text-red-400"}`}>
                    {u.mfa ? "On" : "Off"}
                  </span>
                </td>
                <td className="p-3">
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <span className={`h-1.5 w-1.5 rounded-full ${u.status === "Active" ? "bg-green-400" : "bg-muted-foreground"}`} />
                    {u.status}
                  </div>
                </td>
                <td className="p-3">
                  <div className="flex items-center gap-2">
                    <button onClick={() => toast("Edit user requires backend integration")} className="text-muted-foreground hover:text-foreground">
                      <Pencil size={15} />
                    </button>
                    <button onClick={() => handleDelete(u.id)} className="text-muted-foreground hover:text-destructive">
                      <Trash2 size={15} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="rounded-2xl border border-border bg-card p-6">
        <h2 className="text-lg font-semibold mb-5">Role Permissions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {rolePermissions.map((r) => (
            <div key={r.role}>
              <span className={`text-xs font-medium px-3 py-1 rounded-full ${r.tone}`}>{r.role}</span>
              <ul className="mt-4 space-y-2.5">
                {r.permissions.map((p) => (
                  <li key={p} className="flex items-center gap-2 text-sm">
                    <Check size={14} className="text-green-400" /> {p}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="w-full max-w-md rounded-2xl border border-border bg-card p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-semibold">Add User</h2>
              <button onClick={() => { setShowModal(false); resetForm(); }} className="text-muted-foreground hover:text-foreground">
                <X size={18} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs text-muted-foreground">Full Name</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Priya Nair"
                  className="mt-1 w-full rounded-lg border border-border bg-input px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring/60"
                />
              </div>

              <div>
                <label className="text-xs text-muted-foreground">Role</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-border bg-input px-3 py-2 text-sm"
                >
                  <option>Employee</option>
                  <option>HR Manager</option>
                  <option>Admin</option>
                </select>
              </div>

              <div>
                <label className="text-xs text-muted-foreground">Department</label>
                <input
                  value={dept}
                  onChange={(e) => setDept(e.target.value)}
                  placeholder="e.g. Engineering"
                  className="mt-1 w-full rounded-lg border border-border bg-input px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring/60"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => { setShowModal(false); resetForm(); }}
                className="rounded-lg border border-border px-4 py-2 text-sm hover:bg-accent"
              >
                Cancel
              </button>
              <button
                onClick={handleAddUser}
                className="rounded-lg bg-primary text-primary-foreground px-4 py-2 text-sm font-medium hover:opacity-90"
              >
                Add User
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserManagement;
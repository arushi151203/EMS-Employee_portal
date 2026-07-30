import { useState } from "react";
import { toast } from "sonner";
import { Pencil, Trash2, Check, UserPlus } from "lucide-react";
import { users as initialUsers, rolePermissions } from "../data/userManagementData";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  DataTable,
  DataTableHead,
  DataTableBody,
  DataTableRow,
  DataTableHeadCell,
  DataTableCell,
} from "@/components/ui/data-table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select";

const roleStyles = {
  Employee: "bg-primary/15 text-primary",
  "HR Manager": "bg-purple-500/15 text-purple-400",
  Admin: "bg-destructive/15 text-destructive",
};

const avatarColors = ["bg-primary", "bg-purple-500", "bg-orange-500", "bg-violet-500", "bg-teal-500", "bg-pink-500"];

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
        <Button onClick={() => setShowModal(true)}>
          <UserPlus size={16} /> Add User
        </Button>
      </div>

      <Card className="overflow-hidden p-0 mb-8">
        <DataTable className="border-0">
          <DataTableHead>
            <DataTableRow>
              <DataTableHeadCell>User</DataTableHeadCell>
              <DataTableHeadCell>Role</DataTableHeadCell>
              <DataTableHeadCell>Dept</DataTableHeadCell>
              <DataTableHeadCell>Last Login</DataTableHeadCell>
              <DataTableHeadCell>MFA</DataTableHeadCell>
              <DataTableHeadCell>Status</DataTableHeadCell>
              <DataTableHeadCell>Actions</DataTableHeadCell>
            </DataTableRow>
          </DataTableHead>
          <DataTableBody>
            {users.map((u) => (
              <DataTableRow key={u.id}>
                <DataTableCell>
                  <div className="flex items-center gap-3">
                    <div className={`grid h-8 w-8 place-items-center rounded-full text-xs font-medium text-foreground ${u.color}`}>
                      {u.initials}
                    </div>
                    <span className="font-medium">{u.name}</span>
                  </div>
                </DataTableCell>
                <DataTableCell>
                  <span className={`text-xs font-medium px-3 py-1 rounded-full ${roleStyles[u.role]}`}>{u.role}</span>
                </DataTableCell>
                <DataTableCell className="text-muted-foreground">{u.dept}</DataTableCell>
                <DataTableCell className="text-muted-foreground">{u.lastLogin}</DataTableCell>
                <DataTableCell>
                  <span className={`text-xs font-medium px-3 py-1 rounded-full ${u.mfa ? "bg-success/15 text-success" : "bg-destructive/15 text-destructive"}`}>
                    {u.mfa ? "On" : "Off"}
                  </span>
                </DataTableCell>
                <DataTableCell>
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <span className={`h-1.5 w-1.5 rounded-full ${u.status === "Active" ? "bg-success" : "bg-muted-foreground"}`} />
                    {u.status}
                  </div>
                </DataTableCell>
                <DataTableCell>
                  <div className="flex items-center gap-2">
                    <button onClick={() => toast("Edit user requires backend integration")} className="text-muted-foreground hover:text-foreground">
                      <Pencil size={15} />
                    </button>
                    <button onClick={() => handleDelete(u.id)} className="text-muted-foreground hover:text-destructive">
                      <Trash2 size={15} />
                    </button>
                  </div>
                </DataTableCell>
              </DataTableRow>
            ))}
          </DataTableBody>
        </DataTable>
      </Card>

      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-5">Role Permissions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {rolePermissions.map((r) => (
            <div key={r.role}>
              <span className={`text-xs font-medium px-3 py-1 rounded-full ${r.tone}`}>{r.role}</span>
              <ul className="mt-4 space-y-2.5">
                {r.permissions.map((p) => (
                  <li key={p} className="flex items-center gap-2 text-sm">
                    <Check size={14} className="text-success" /> {p}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Card>

      <Dialog open={showModal} onOpenChange={(next) => { setShowModal(next); if (!next) resetForm(); }}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Add User</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <Field>
              <FieldLabel>Full Name</FieldLabel>
              <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Priya Nair" />
            </Field>

            <Field>
              <FieldLabel>Role</FieldLabel>
              <Select value={role} onValueChange={setRole}>
                <SelectTrigger />
                <SelectContent>
                  <SelectItem value="Employee">Employee</SelectItem>
                  <SelectItem value="HR Manager">HR Manager</SelectItem>
                  <SelectItem value="Admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </Field>

            <Field>
              <FieldLabel>Department</FieldLabel>
              <Input value={dept} onChange={(e) => setDept(e.target.value)} placeholder="e.g. Engineering" />
            </Field>
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <Button variant="outline" onClick={() => { setShowModal(false); resetForm(); }}>
              Cancel
            </Button>
            <Button onClick={handleAddUser}>Add User</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default UserManagement;
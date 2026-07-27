import { useState, useEffect } from "react";
import "../../css/profile/EmploymentForm.css";
import { toast } from "sonner";
import { getUser } from "@/lib/auth";
import { getProfile, updateEmployment } from "@/employee/services/profileService";

function EmploymentForm() {
  const currentUser = getUser();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    designation: "",
    department: "",
    employment_type: "Full Time",
    manager: "",
    date_of_joining: "",
    work_location: "",
    status: "Active",
  });

  useEffect(() => {
    if (!currentUser?.employee_id) return;
    getProfile(currentUser.employee_id)
      .then((res) => {
        const d = res.data;
        setForm({
          designation: d.designation || "",
          department: d.department || "",
          employment_type: d.employment_type || "Full Time",
          manager: d.manager || "",
          date_of_joining: d.date_of_joining ? d.date_of_joining.slice(0, 10) : "",
          work_location: d.work_location || "",
          status: d.status || "Active",
        });
      })
      .catch((err) => {
        toast.error(err.response?.data?.message || "Could not load employment details");
      })
      .finally(() => setLoading(false));
  }, [currentUser?.employee_id]);

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await updateEmployment(currentUser.employee_id, form);
      toast.success(res.data.message);
    } catch (err) {
      toast.error(err.response?.data?.message || "Could not save changes");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="employment-form"><p>Loading...</p></div>;
  }

  return (
    <div className="employment-form">
      <div className="employment-header">
        <h2>Employment Information</h2>
        <p>Manage your employment details</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="employment-grid">
          <div className="form-group">
            <label>Employee ID</label>
            <input type="text" value={currentUser?.employee_id || ""} readOnly />
          </div>

          <div className="form-group">
            <label>Department</label>
            <input type="text" value={form.department} onChange={handleChange("department")} />
          </div>

          <div className="form-group">
            <label>Designation</label>
            <input type="text" value={form.designation} onChange={handleChange("designation")} />
          </div>

          <div className="form-group">
            <label>Employment Type</label>
            <select value={form.employment_type} onChange={handleChange("employment_type")}>
              <option>Full Time</option>
              <option>Part Time</option>
              <option>Intern</option>
              <option>Contract</option>
            </select>
          </div>

          <div className="form-group">
            <label>Manager</label>
            <input type="text" value={form.manager} onChange={handleChange("manager")} />
          </div>

          <div className="form-group">
            <label>Joining Date</label>
            <input type="date" value={form.date_of_joining} onChange={handleChange("date_of_joining")} />
          </div>

          <div className="form-group">
            <label>Work Location</label>
            <input type="text" value={form.work_location} onChange={handleChange("work_location")} />
          </div>

          <div className="form-group">
            <label>Status</label>
            <select value={form.status} onChange={handleChange("status")}>
              <option>Active</option>
              <option>On Leave</option>
              <option>Resigned</option>
            </select>
          </div>
        </div>

        <div className="employment-button">
          <button type="submit" disabled={saving}>
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default EmploymentForm;
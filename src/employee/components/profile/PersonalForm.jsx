import { useState, useEffect } from "react";
import "../../css/profile/PersonalForm.css";
import { toast } from "sonner";
import { getUser } from "@/lib/auth";
import { getProfile, updatePersonal } from "@/employee/services/profileService";

function PersonalForm() {
  const currentUser = getUser();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    dob: "",
    gender: "Male",
    address: "",
    city: "",
    state: "",
    zip_code: "",
    country: "",
  });

  useEffect(() => {
    if (!currentUser?.employee_id) return;
    getProfile(currentUser.employee_id)
      .then((res) => {
        const d = res.data;
        setForm({
          name: d.name || "",
          email: d.email || "",
          phone: d.phone || "",
          dob: d.dob ? d.dob.slice(0, 10) : "",
          gender: d.gender || "Male",
          address: d.address || "",
          city: d.city || "",
          state: d.state || "",
          zip_code: d.zip_code || "",
          country: d.country || "",
        });
      })
      .catch((err) => {
        toast.error(err.response?.data?.message || "Could not load profile");
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
      const res = await updatePersonal(currentUser.employee_id, form);
      toast.success(res.data.message);
    } catch (err) {
      toast.error(err.response?.data?.message || "Could not save changes");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="personal-form"><p>Loading...</p></div>;
  }

  return (
    <div className="personal-form">
      <div className="form-header">
        <h2>Personal Information</h2>
        <p>Update your personal details and contact information</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-group">
            <label>Full Name</label>
            <input type="text" value={form.name} onChange={handleChange("name")} />
          </div>

          <div className="form-group">
            <label>Email Address</label>
            <input type="email" value={form.email} onChange={handleChange("email")} />
          </div>

          <div className="form-group">
            <label>Phone Number</label>
            <input type="text" value={form.phone} onChange={handleChange("phone")} />
          </div>

          <div className="form-group">
            <label>Date of Birth</label>
            <input type="date" value={form.dob} onChange={handleChange("dob")} />
          </div>

          <div className="form-group">
            <label>Gender</label>
            <select value={form.gender} onChange={handleChange("gender")}>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </div>

          <div className="form-group full-width">
            <label>Address</label>
            <input type="text" value={form.address} onChange={handleChange("address")} />
          </div>

          <div className="form-group">
            <label>City</label>
            <input type="text" value={form.city} onChange={handleChange("city")} />
          </div>

          <div className="form-group">
            <label>State</label>
            <input type="text" value={form.state} onChange={handleChange("state")} />
          </div>

          <div className="form-group">
            <label>ZIP Code</label>
            <input type="text" value={form.zip_code} onChange={handleChange("zip_code")} />
          </div>

          <div className="form-group">
            <label>Country</label>
            <input type="text" value={form.country} onChange={handleChange("country")} />
          </div>
        </div>

        <div className="button-container">
          <button type="submit" disabled={saving}>
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default PersonalForm;
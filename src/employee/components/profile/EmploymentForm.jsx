import "../../css/profile/EmploymentForm.css";
import { toast } from "sonner";

function EmploymentForm() {
  return (
    <div className="employment-form">

      <div className="employment-header">
        <h2>Employment Information</h2>
        <p>Manage your employment details</p>
      </div>

      <form onSubmit={(e) => { e.preventDefault(); toast.success("Employment details saved!"); }}>

        <div className="employment-grid">

          <div className="form-group">
            <label>Employee ID</label>
            <input
              type="text"
              defaultValue="EMP001234"
              readOnly
            />
          </div>

          <div className="form-group">
            <label>Department</label>
            <input
              type="text"
              defaultValue="Engineering"
            />
          </div>

          <div className="form-group">
            <label>Designation</label>
            <input
              type="text"
              defaultValue="Senior Software Engineer"
            />
          </div>

          <div className="form-group">
            <label>Employment Type</label>

            <select defaultValue="Full Time">
              <option>Full Time</option>
              <option>Part Time</option>
              <option>Intern</option>
              <option>Contract</option>
            </select>

          </div>

          <div className="form-group">
            <label>Manager</label>
            <input
              type="text"
              defaultValue="Sarah Johnson"
            />
          </div>

          <div className="form-group">
            <label>Joining Date</label>
            <input
              type="date"
              defaultValue="2021-07-12"
            />
          </div>

          <div className="form-group">
            <label>Work Location</label>
            <input
              type="text"
              defaultValue="San Francisco"
            />
          </div>

          <div className="form-group">
            <label>Status</label>

            <select defaultValue="Active">
              <option>Active</option>
              <option>On Leave</option>
              <option>Resigned</option>
            </select>

          </div>

        </div>

        <div className="employment-button">

          <button type="submit">
            Save Changes
          </button>

        </div>

      </form>

    </div>
  );
}

export default EmploymentForm;
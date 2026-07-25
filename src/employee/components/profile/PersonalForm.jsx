import "../../css/profile/PersonalForm.css";
import { toast } from "sonner";

function PersonalForm() {
  return (
    <div className="personal-form">

      <div className="form-header">
        <h2>Personal Information</h2>
        <p>
          Update your personal details and contact information
        </p>
      </div>

      <form onSubmit={(e) => { e.preventDefault(); toast.success("Personal information saved!"); }}>

        <div className="form-grid">

          <div className="form-group">
            <label>First Name</label>
            <input
              type="text"
              defaultValue="Alex"
            />
          </div>

          <div className="form-group">
            <label>Last Name</label>
            <input
              type="text"
              defaultValue="Chen"
            />
          </div>

          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              defaultValue="alex.chen@company.com"
            />
          </div>

          <div className="form-group">
            <label>Phone Number</label>
            <input
              type="text"
              defaultValue="+1 (555) 123-4567"
            />
          </div>

          <div className="form-group">
            <label>Date of Birth</label>
            <input
              type="date"
              defaultValue="1993-04-15"
            />
          </div>

          <div className="form-group">
            <label>Gender</label>

            <select defaultValue="Male">
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>

          </div>

          <div className="form-group full-width">
            <label>Address</label>
            <input
              type="text"
              defaultValue="123 Innovation Drive"
            />
          </div>

          <div className="form-group">
            <label>City</label>
            <input
              type="text"
              defaultValue="San Francisco"
            />
          </div>

          <div className="form-group">
            <label>State</label>
            <input
              type="text"
              defaultValue="California"
            />
          </div>

          <div className="form-group">
            <label>ZIP Code</label>
            <input
              type="text"
              defaultValue="94105"
            />
          </div>

          <div className="form-group">
            <label>Country</label>
            <input
              type="text"
              defaultValue="United States"
            />
          </div>

        </div>

        <div className="button-container">
          <button type="submit">
            Save Changes
          </button>
        </div>

      </form>

    </div>
  );
}

export default PersonalForm;
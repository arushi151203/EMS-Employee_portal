import { useState } from "react";
import { toast } from "sonner";
import "../../css/profile/EmergencyForm.css";
function EmergencyForm() {

  const [formData, setFormData] = useState({
    primaryName: "John Smith",
    primaryRelation: "Father",
    primaryPhone: "+1 (555) 111-2222",
    primaryEmail: "john@example.com",

    secondaryName: "Emily Smith",
    secondaryRelation: "Mother",
    secondaryPhone: "+1 (555) 333-4444",
    secondaryEmail: "emily@example.com",

    address: "123 Innovation Drive, San Francisco"
  });

  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    });

  };

const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Emergency Contact Saved Successfully!");
    console.log(formData);
};

  return (

    <div className="emergency-form">

      <div className="emergency-header">

        <h2>Emergency Contact</h2>

        <p>
          Manage emergency contact information
        </p>

      </div>

      <form onSubmit={handleSubmit}>

        <h3>Primary Contact</h3>

        <div className="form-grid">

          <div className="form-group">
            <label>Name</label>

            <input
              type="text"
              name="primaryName"
              value={formData.primaryName}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Relationship</label>

            <input
              type="text"
              name="primaryRelation"
              value={formData.primaryRelation}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Phone Number</label>

            <input
              type="text"
              name="primaryPhone"
              value={formData.primaryPhone}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Email</label>

            <input
              type="email"
              name="primaryEmail"
              value={formData.primaryEmail}
              onChange={handleChange}
            />
          </div>

        </div>

        <h3 className="section-title">
          Secondary Contact
        </h3>

        <div className="form-grid">

          <div className="form-group">
            <label>Name</label>

            <input
              type="text"
              name="secondaryName"
              value={formData.secondaryName}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Relationship</label>

            <input
              type="text"
              name="secondaryRelation"
              value={formData.secondaryRelation}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Phone Number</label>

            <input
              type="text"
              name="secondaryPhone"
              value={formData.secondaryPhone}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Email</label>

            <input
              type="email"
              name="secondaryEmail"
              value={formData.secondaryEmail}
              onChange={handleChange}
            />
          </div>

        </div>

        <div className="form-group full-width">

          <label>Address</label>

          <textarea
            name="address"
            rows="4"
            value={formData.address}
            onChange={handleChange}
          ></textarea>

        </div>

        <div className="save-btn-container">

          <button type="submit">
            Save Changes
          </button>

        </div>

      </form>

    </div>

  );

}

export default EmergencyForm;
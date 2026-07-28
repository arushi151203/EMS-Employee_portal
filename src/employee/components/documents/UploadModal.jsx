import { useState } from "react";
import { toast } from "sonner";
import { uploadDocument } from "@/employee/services/documentsService";

function UploadModal({ show, onClose, onUploaded }) {
  const [document, setDocument] = useState("");
  const [category, setCategory] = useState("other");
  const [file, setFile] = useState(null);
  const [saving, setSaving] = useState(false);

  if (!show) return null;

  const resetForm = () => {
    setDocument("");
    setCategory("other");
    setFile(null);
  };

  const handleSave = async () => {
    if (document === "") {
      toast.error("Enter Document Name");
      return;
    }
    if (!file) {
      toast.error("Please choose a file");
      return;
    }

    const formData = new FormData();
    formData.append("document", document);
    formData.append("category", category);
    formData.append("file", file);

    setSaving(true);
    try {
      await uploadDocument(formData);
      toast.success("Document uploaded successfully");
      resetForm();
      onUploaded();
      onClose();
    } catch (err) {
      toast.error(err.response?.data?.message || "Upload failed. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Upload Document</h2>

        <div className="form-group">
          <label>Document Name</label>
          <input type="text" placeholder="Enter Document Name" value={document} onChange={(e) => setDocument(e.target.value)} />
        </div>

        <div className="form-group">
          <label>Category</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="contract">Contract</option>
            <option value="offer">Offer</option>
            <option value="legal">Legal</option>
            <option value="performance">Performance</option>
            <option value="payslip">Payslip</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="form-group">
          <label>Choose File</label>
          <input type="file" accept=".pdf,.jpg,.jpeg,.png,.doc,.docx" onChange={(e) => setFile(e.target.files[0])} />
        </div>

        <div className="modal-buttons">
          <button className="cancel-btn" onClick={onClose}>Cancel</button>
          <button className="save-btn" onClick={handleSave} disabled={saving}>
            {saving ? "Uploading..." : "Upload"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default UploadModal;
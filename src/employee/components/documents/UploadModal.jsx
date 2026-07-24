import { useState } from "react";
import { toast } from "sonner";

function UploadModal({ show, onClose, onSave }) {
  const [document, setDocument] = useState("");
  const [status, setStatus] = useState("Approved");
  const [expiry, setExpiry] = useState("");
  const [file, setFile] = useState(null);

  if (!show) return null;

  const handleSave = () => {
    if (document === "") {
      toast.error("Enter Document Name");
      return;
    }
    const size = file ? `${Math.round(file.size / 1024)} KB` : "—";
    onSave({ document, status, expiry, file, size });
    setDocument("");
    setStatus("Approved");
    setExpiry("");
    setFile(null);
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
          <label>Status</label>
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option>Approved</option>
            <option>Pending</option>
            <option>Expired</option>
          </select>
        </div>

        <div className="form-group">
          <label>Expiry Date</label>
          <input type="date" value={expiry} onChange={(e) => setExpiry(e.target.value)} />
        </div>

        <div className="form-group">
          <label>Choose File</label>
          <input type="file" accept=".pdf,.jpg,.jpeg,.png,.doc,.docx" onChange={(e) => setFile(e.target.files[0])} />
        </div>

        <div className="modal-buttons">
          <button className="cancel-btn" onClick={onClose}>Cancel</button>
          <button className="save-btn" onClick={handleSave}>Upload</button>
        </div>
      </div>
    </div>
  );
}

export default UploadModal;
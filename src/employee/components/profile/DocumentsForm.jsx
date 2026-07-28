import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Upload } from "lucide-react";
import DocumentsTable from "../documents/DocumentsTable";
import UploadModal from "../documents/UploadModal";
import { getMyDocuments } from "@/employee/services/documentsService";
import "../../css/documents.css";

function DocumentsForm() {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const loadDocuments = () => {
    setLoading(true);
    getMyDocuments()
      .then((res) => setDocuments(res.data))
      .catch((err) => toast.error(err.response?.data?.message || "Could not load documents"))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadDocuments();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
     <div className="documents-header">
        <div>
          <h2>My Documents</h2>
        </div>
        <button className="save-btn" onClick={() => setShowModal(true)} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <Upload size={16} /> Upload
        </button>
      </div>

      <DocumentsTable documents={documents} />

      <UploadModal show={showModal} onClose={() => setShowModal(false)} onUploaded={loadDocuments} />
    </div>
  );
}

export default DocumentsForm;
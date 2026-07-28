import { useState, useEffect } from "react";
import { toast } from "sonner";
import { FileText, Layers, DollarSign, ShieldCheck, Upload } from "lucide-react";
import { StatCard } from "@/components/common/StatCard";
import DocumentsTable from "../components/documents/DocumentsTable";
import UploadModal from "../components/documents/UploadModal";
import { getMyDocuments } from "@/employee/services/documentsService";
import "../css/documents.css";

export default function Documents() {
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
    return <div className="documents-page"><p>Loading...</p></div>;
  }

  const count = (cat) => documents.filter((d) => d.category === cat).length;

  return (
    <div className="documents-page">
     <div className="documents-header">
        <div>
          <h1>Documents</h1>
          <p className="documents-subtitle">All your official documents in one place</p>
        </div>
        <button className="save-btn" onClick={() => setShowModal(true)} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <Upload size={16} /> Upload Document
        </button>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6">
        <StatCard label="TOTAL FILES" value={documents.length} icon={<FileText size={16} />} tone="info" />
        <StatCard label="CONTRACTS" value={count("contract")} icon={<Layers size={16} />} tone="violet" />
        <StatCard label="PAYSLIPS" value={count("payslip")} icon={<DollarSign size={16} />} tone="success" />
        <StatCard label="LEGAL" value={count("legal")} icon={<ShieldCheck size={16} />} tone="danger" />
      </div>

   <DocumentsTable documents={documents} />

      <UploadModal show={showModal} onClose={() => setShowModal(false)} onUploaded={loadDocuments} />
    </div>
  );
}
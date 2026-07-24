import { useState } from "react";
import { toast } from "sonner";
import { FileText, Search, CheckCircle2, Clock, AlertTriangle, Upload } from "lucide-react";
import { StatCard } from "@/components/common/StatCard";
import { ConfirmDialog } from "@/components/common/ConfirmDialog";
import DocumentsTable from "../components/documents/DocumentsTable";
import UploadModal from "../components/documents/UploadModal";
import documentsData from "../data/documentsData";
import "../css/documents.css";

export default function Documents() {
  const [documents, setDocuments] = useState(documentsData);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const addDocument = (newDocument) => {
    setDocuments([...documents, { id: documents.length + 1, ...newDocument }]);
    setShowModal(false);
    toast.success("Document uploaded successfully");
  };

  const handleDelete = (id) => {
    setDeleteId(id);
    setShowConfirm(true);
  };

  const confirmDelete = () => {
    setDocuments(documents.filter((doc) => doc.id !== deleteId));
    toast.success("Document deleted successfully");
  };

  return (
    <div className="documents-page">
      <div className="documents-header">
        <div>
          <h1>Documents</h1>
          <p className="documents-subtitle">Manage your employment documents and certificates</p>
        </div>
        <button className="save-btn" onClick={() => setShowModal(true)} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <Upload size={16} /> Upload Document
        </button>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6">
        <StatCard label="TOTAL DOCUMENTS" value={documents.length} icon={<FileText size={16} />} tone="info" />
        <StatCard label="APPROVED" value={documents.filter((d) => d.status === "Approved").length} icon={<CheckCircle2 size={16} />} tone="success" />
        <StatCard label="PENDING" value={documents.filter((d) => d.status === "Pending").length} icon={<Clock size={16} />} tone="warning" />
        <StatCard label="EXPIRED" value={documents.filter((d) => d.status === "Expired").length} icon={<AlertTriangle size={16} />} tone="danger" />
      </div>

      <div className="documents-toolbar">
        <div className="documents-search">
          <Search size={16} />
          <input type="text" placeholder="Search documents..." value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <select className="documents-filter" value={status} onChange={(e) => setStatus(e.target.value)}>
          <option>All</option>
          <option>Approved</option>
          <option>Pending</option>
          <option>Expired</option>
        </select>
      </div>

      <DocumentsTable documents={documents} search={search} status={status} onDelete={handleDelete} />

      <UploadModal show={showModal} onClose={() => setShowModal(false)} onSave={addDocument} />

      <ConfirmDialog
        open={showConfirm}
        onOpenChange={setShowConfirm}
        title="Delete document?"
        description="This action cannot be undone."
        confirmLabel="Delete"
        destructive
        onConfirm={confirmDelete}
      />
    </div>
  );
}
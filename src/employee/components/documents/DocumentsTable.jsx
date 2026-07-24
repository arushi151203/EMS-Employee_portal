import { Eye, Download, Trash2, FileText } from "lucide-react";
import { toast } from "sonner";

function DocumentsTable({ documents, search, status, onDelete }) {
  const filteredDocuments = documents.filter((doc) => {
    const matchSearch = doc.document.toLowerCase().includes(search.toLowerCase());
    const matchStatus = status === "All" || doc.status === status;
    return matchSearch && matchStatus;
  });

  const previewDocument = (doc) => {
    if (doc.file) {
      window.open(URL.createObjectURL(doc.file));
    } else {
      toast.error("No file uploaded.");
    }
  };

  const downloadDocument = (doc) => {
    if (doc.file) {
      const url = URL.createObjectURL(doc.file);
      const link = document.createElement("a");
      link.href = url;
      link.download = doc.file.name;
      link.click();
      URL.revokeObjectURL(url);
    } else {
      toast.error("No file uploaded.");
    }
  };

  return (
    <div className="documents-list">
      {filteredDocuments.length === 0 ? (
        <div className="empty-state">No Documents Found</div>
      ) : (
        filteredDocuments.map((doc) => (
          <div className="document-item" key={doc.id}>
            <div className="document-left">
              <div className="document-icon">
                <FileText size={20} />
              </div>
              <div>
                <h3>{doc.document}</h3>
                <p>{doc.size} • Expires {doc.expiry}</p>
              </div>
            </div>
            <div className="document-right">
              <span className={`status-badge ${doc.status.toLowerCase()}`}>{doc.status}</span>
              <button className="action-btn" onClick={() => previewDocument(doc)}>
                <Eye size={16} />
              </button>
              <button className="action-btn" onClick={() => downloadDocument(doc)}>
                <Download size={16} />
              </button>
              <button className="action-btn delete" onClick={() => onDelete(doc.id)}>
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default DocumentsTable;
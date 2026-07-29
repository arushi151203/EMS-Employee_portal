import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Upload } from "lucide-react";
import DocumentsTable from "../documents/DocumentsTable";
import UploadModal from "../documents/UploadModal";
import { getMyDocuments } from "@/employee/services/documentsService";
import { Button } from "@/components/ui/button";

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
    return <p className="text-sm text-muted-foreground">Loading...</p>;
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-base font-semibold">My Documents</h2>
        <Button onClick={() => setShowModal(true)}>
          <Upload className="size-4" /> Upload
        </Button>
      </div>

      <DocumentsTable documents={documents} />

      <UploadModal show={showModal} onClose={() => setShowModal(false)} onUploaded={loadDocuments} />
    </div>
  );
}

export default DocumentsForm;
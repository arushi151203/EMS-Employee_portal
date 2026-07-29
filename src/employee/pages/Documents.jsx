import { Eye, Download, FileText } from "lucide-react";
import { FILE_BASE_URL } from "@/employee/services/documentsService";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/ui/empty-state";

const categoryLabels = {
  contract: "contract",
  offer: "offer",
  legal: "legal",
  performance: "performance",
  payslip: "payslip",
  other: "other",
};

function DocumentsTable({ documents }) {
  const fileUrl = (doc) => `${FILE_BASE_URL}${doc.file_path}`;

  if (documents.length === 0) {
    return (
      <EmptyState
        icon={<FileText className="size-5" />}
        title="No Documents Found"
      />
    );
  }

  return (
    <Card className="divide-y divide-border overflow-hidden p-0">
      {documents.map((doc) => (
        <div className="flex items-center justify-between gap-4 px-4 py-3" key={doc.id}>
          <div className="flex min-w-0 items-center gap-3">
            <div className="grid size-10 shrink-0 place-items-center rounded-lg bg-muted text-muted-foreground">
              <FileText size={20} />
            </div>
            <div className="min-w-0">
              <h3 className="truncate text-sm font-medium">{doc.document_name}</h3>
              <p className="text-xs text-muted-foreground">
                {doc.file_size ? `${Math.round(doc.file_size / 1024)} KB` : ""}
                {doc.uploaded_at ? ` • Added ${new Date(doc.uploaded_at).toLocaleDateString()}` : ""}
              </p>
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <Badge variant="outline">{categoryLabels[doc.category] || doc.category}</Badge>
            <a
              className="grid size-8 place-items-center rounded-md text-muted-foreground hover:bg-accent hover:text-foreground"
              href={fileUrl(doc)}
              target="_blank"
              rel="noreferrer"
            >
              <Eye size={16} />
            </a>
            <a
              className="grid size-8 place-items-center rounded-md text-muted-foreground hover:bg-accent hover:text-foreground"
              href={fileUrl(doc)}
              download
            >
              <Download size={16} />
            </a>
          </div>
        </div>
      ))}
    </Card>
  );
}

export default DocumentsTable;
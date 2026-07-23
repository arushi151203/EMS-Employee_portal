import { useState } from "react";
import {
  Download,
  FileText,
  FileSpreadsheet,
  File,
  Printer,
} from "lucide-react";

function ExportMenu({
  onPDF,
  onExcel,
  onCSV,
  onPrint,
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">

      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 bg-[#1E293B] hover:bg-[#334155] border border-slate-700 text-white px-5 py-3 rounded-xl"
      >
        <Download size={18} />
        Export
      </button>

      {open && (
        <div className="absolute right-0 mt-3 w-56 bg-[#111827] border border-slate-700 rounded-xl shadow-xl z-50">

          <button
            onClick={() => {
              onPDF();
              setOpen(false);
            }}
            className="w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-700 text-white"
          >
            <FileText size={18} />
            Export as PDF
          </button>

          <button
            onClick={() => {
              onExcel();
              setOpen(false);
            }}
            className="w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-700 text-white"
          >
            <FileSpreadsheet size={18} />
            Export as Excel
          </button>

          <button
            onClick={() => {
              onCSV();
              setOpen(false);
            }}
            className="w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-700 text-white"
          >
            <File size={18} />
            Export as CSV
          </button>

          <button
            onClick={() => {
              onPrint();
              setOpen(false);
            }}
            className="w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-700 text-white"
          >
            <Printer size={18} />
            Print Report
          </button>

        </div>
      )}

    </div>
  );
}

export default ExportMenu;
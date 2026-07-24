import { useState } from "react";
import { toast } from "sonner";
import { Search, Download } from "lucide-react";
import { auditLogs } from "../data/auditLogsData";

const severityStyles = {
  Info: "bg-blue-500/15 text-blue-400",
  Warning: "bg-yellow-500/15 text-yellow-400",
  Critical: "bg-red-500/15 text-red-400",
};

function AuditLogs() {
  const [search, setSearch] = useState("");
  const [severity, setSeverity] = useState("All");

  const filteredLogs = auditLogs.filter((log) => {
    const matchSearch =
      log.user.toLowerCase().includes(search.toLowerCase()) ||
      log.action.toLowerCase().includes(search.toLowerCase()) ||
      log.target.toLowerCase().includes(search.toLowerCase());
    const matchSeverity = severity === "All" || log.severity === severity;
    return matchSearch && matchSeverity;
  });

  const exportCSV = () => {
    const headers = ["User", "Action", "Target", "Severity", "Timestamp"];
    const rows = filteredLogs.map((log) => [log.user, log.action, log.target, log.severity, log.time]);
    const csv = [headers.join(","), ...rows.map((row) => row.join(","))].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "audit_logs.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Audit logs exported successfully!");
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Audit Logs</h1>
          <p className="text-sm text-muted-foreground mt-1">Monitor all administrative activities</p>
        </div>
        <button
          onClick={exportCSV}
          className="flex items-center gap-2 rounded-lg bg-primary text-primary-foreground px-4 py-2 text-sm font-medium hover:opacity-90"
        >
          <Download size={16} /> Export Logs
        </button>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="flex-1 flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2">
          <Search size={16} className="text-muted-foreground" />
          <input
            type="text"
            placeholder="Search user, action or target..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-transparent outline-none text-sm"
          />
        </div>
        <select
          value={severity}
          onChange={(e) => setSeverity(e.target.value)}
          className="rounded-lg border border-border bg-card px-3 py-2 text-sm w-48"
        >
          <option value="All">All Severity</option>
          <option value="Info">Info</option>
          <option value="Warning">Warning</option>
          <option value="Critical">Critical</option>
        </select>
      </div>

      <div className="rounded-2xl border border-border bg-card overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-muted/50 text-left">
              <th className="p-3 font-medium">User</th>
              <th className="p-3 font-medium">Action</th>
              <th className="p-3 font-medium">Target</th>
              <th className="p-3 font-medium">Severity</th>
              <th className="p-3 font-medium">Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {filteredLogs.length > 0 ? (
              filteredLogs.map((log) => (
                <tr key={log.id} className="border-t border-border">
                  <td className="p-3">{log.user}</td>
                  <td className="p-3">{log.action}</td>
                  <td className="p-3">{log.target}</td>
                  <td className="p-3">
                    <span className={`text-xs font-medium px-3 py-1 rounded-full ${severityStyles[log.severity]}`}>{log.severity}</span>
                  </td>
                  <td className="p-3 text-muted-foreground">{log.time}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center p-8 text-muted-foreground">No audit logs found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AuditLogs;
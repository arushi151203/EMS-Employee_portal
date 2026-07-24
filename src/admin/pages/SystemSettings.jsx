import { useState } from "react";
import { toast } from "sonner";
import { HardDriveDownload, Undo2, AlertTriangle } from "lucide-react";

function Toggle({ label, defaultOn }) {
  const [on, setOn] = useState(!!defaultOn);
  return (
    <div className="flex items-center justify-between py-3">
      <span className="text-sm">{label}</span>
      <button
        onClick={() => setOn((v) => !v)}
        className={`relative h-6 w-11 shrink-0 rounded-full transition ${on ? "bg-primary" : "bg-muted"}`}
        aria-pressed={on}
      >
        <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition ${on ? "left-[22px]" : "left-0.5"}`} />
      </button>
    </div>
  );
}

function Field({ label, defaultValue }) {
  return (
    <div>
      <label className="text-xs text-muted-foreground">{label}</label>
      <input
        defaultValue={defaultValue}
        className="mt-1 w-full rounded-lg border border-border bg-input px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring/60"
      />
    </div>
  );
}

function SystemSettings() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">System Settings</h1>
        <p className="text-sm text-muted-foreground mt-1">Configure company settings and permissions</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-2xl border border-border bg-card p-6 space-y-4">
          <h2 className="text-lg font-semibold mb-2">Company Configuration</h2>
          <Field label="Company Name" defaultValue="Nexus Technologies" />
          <Field label="Industry" defaultValue="Technology" />
          <Field label="Headquarters" defaultValue="San Francisco, CA" />
          <Field label="Fiscal Year Start" defaultValue="January" />
          <Field label="Default Currency" defaultValue="USD" />
          <Field label="Work Week" defaultValue="Mon–Fri" />
          <button
            onClick={() => toast.success("Configuration saved (mock)")}
            className="rounded-lg bg-primary text-primary-foreground px-4 py-2 text-sm font-medium hover:opacity-90"
          >
            Save Configuration
          </button>
        </div>

        <div className="space-y-6">
          <div className="rounded-2xl border border-border bg-card p-6">
            <h2 className="text-lg font-semibold mb-1">Data Backup</h2>
            <p className="text-xs text-muted-foreground mb-4">Last backup: Jul 2, 2024 at 03:00 UTC</p>
            <div className="flex gap-3">
              <button
                onClick={() => toast.success("Backup started (mock)")}
                className="flex items-center gap-2 rounded-lg bg-primary text-primary-foreground px-3 py-2 text-sm font-medium hover:opacity-90"
              >
                <HardDriveDownload size={15} /> Backup Now
              </button>
              <button
                onClick={() => toast("Restore requires backend integration")}
                className="flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm hover:bg-accent"
              >
                <Undo2 size={15} /> Restore
              </button>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 divide-y divide-border">
            <h2 className="text-lg font-semibold mb-1 pb-3">System Toggles</h2>
            <Toggle label="Maintenance Mode" />
            <Toggle label="Email Notifications" defaultOn />
            <Toggle label="Two-Factor Required" defaultOn />
            <Toggle label="Audit Logging" defaultOn />
            <Toggle label="API Access" defaultOn />
          </div>

          <div className="rounded-2xl border border-destructive/30 bg-card p-6">
            <h2 className="text-lg font-semibold mb-1">Danger Zone</h2>
            <p className="text-xs text-muted-foreground mb-4">These actions are irreversible. Proceed with caution.</p>
            <div className="flex gap-3">
              <button
                onClick={() => toast.error("Purge Test Data requires backend integration")}
                className="flex items-center gap-2 rounded-lg border border-destructive/40 text-destructive px-3 py-2 text-sm hover:bg-destructive/10"
              >
                <AlertTriangle size={15} /> Purge Test Data
              </button>
              <button
                onClick={() => toast.error("Reset All Permissions requires backend integration")}
                className="flex items-center gap-2 rounded-lg border border-destructive/40 text-destructive px-3 py-2 text-sm hover:bg-destructive/10"
              >
                <AlertTriangle size={15} /> Reset All Permissions
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SystemSettings;
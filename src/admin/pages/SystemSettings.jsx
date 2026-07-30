import { useState } from "react";
import { toast } from "sonner";
import { HardDriveDownload, Undo2, AlertTriangle } from "lucide-react";

import { Card } from "@/components/ui/card";
import { Field as FieldWrap, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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
    <FieldWrap>
      <FieldLabel>{label}</FieldLabel>
      <Input defaultValue={defaultValue} />
    </FieldWrap>
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
        <Card className="p-6 space-y-4">
          <h2 className="text-lg font-semibold mb-2">Company Configuration</h2>
          <Field label="Company Name" defaultValue="Nexus Technologies" />
          <Field label="Industry" defaultValue="Technology" />
          <Field label="Headquarters" defaultValue="San Francisco, CA" />
          <Field label="Fiscal Year Start" defaultValue="January" />
          <Field label="Default Currency" defaultValue="USD" />
          <Field label="Work Week" defaultValue="Mon–Fri" />
          <Button onClick={() => toast.success("Configuration saved (mock)")}>
            Save Configuration
          </Button>
        </Card>

        <div className="space-y-6">
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-1">Data Backup</h2>
            <p className="text-xs text-muted-foreground mb-4">Last backup: Jul 2, 2024 at 03:00 UTC</p>
            <div className="flex gap-3">
              <Button onClick={() => toast.success("Backup started (mock)")}>
                <HardDriveDownload size={15} /> Backup Now
              </Button>
              <Button variant="outline" onClick={() => toast("Restore requires backend integration")}>
                <Undo2 size={15} /> Restore
              </Button>
            </div>
          </Card>

          <Card className="p-6 divide-y divide-border">
            <h2 className="text-lg font-semibold mb-1 pb-3">System Toggles</h2>
            <Toggle label="Maintenance Mode" />
            <Toggle label="Email Notifications" defaultOn />
            <Toggle label="Two-Factor Required" defaultOn />
            <Toggle label="Audit Logging" defaultOn />
            <Toggle label="API Access" defaultOn />
          </Card>

          <Card className="border-destructive/30 p-6">
            <h2 className="text-lg font-semibold mb-1">Danger Zone</h2>
            <p className="text-xs text-muted-foreground mb-4">These actions are irreversible. Proceed with caution.</p>
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="border-destructive/40 text-destructive hover:bg-destructive/10"
                onClick={() => toast.error("Purge Test Data requires backend integration")}
              >
                <AlertTriangle size={15} /> Purge Test Data
              </Button>
              <Button
                variant="outline"
                className="border-destructive/40 text-destructive hover:bg-destructive/10"
                onClick={() => toast.error("Reset All Permissions requires backend integration")}
              >
                <AlertTriangle size={15} /> Reset All Permissions
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default SystemSettings;
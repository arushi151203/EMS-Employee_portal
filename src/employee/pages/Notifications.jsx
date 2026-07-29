import { useState } from "react";
import { Pin, Bell } from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { notifications } from "../data/notificationsData";

const categories = ["All", "Event", "Policy", "Holiday", "HR", "IT"];

function Notifications() {
  const [cat, setCat] = useState("All");
  const filtered = notifications.filter((n) => cat === "All" || n.tag === cat);
  const pinned = filtered.filter((n) => n.pinned);
  const rest = filtered.filter((n) => !n.pinned);

  return (
    <div className="space-y-6">
      <PageHeader title="Notifications" subtitle="Stay up to date with important updates" />

      <div className="flex flex-wrap gap-1">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className={`rounded-full px-3 py-1.5 text-xs ${cat === c ? "bg-primary text-primary-foreground" : "bg-surface border border-border text-muted-foreground hover:text-foreground"}`}
          >
            {c}
          </button>
        ))}
      </div>

      {pinned.length > 0 && (
        <div>
          <h3 className="mb-3 flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground">
            <Pin className="h-3.5 w-3.5" /> Pinned
          </h3>
          <div className="grid gap-3 md:grid-cols-2">
            {pinned.map((n) => (
              <NotificationCard key={n.title} a={n} />
            ))}
          </div>
        </div>
      )}

      <div>
        <h3 className="mb-3 flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground">
          <Bell className="h-3.5 w-3.5" /> Recent
        </h3>
        <div className="space-y-3">
          {rest.map((a) => (
            <NotificationCard key={a.title} a={a} />
          ))}
        </div>
      </div>
    </div>
  );
}

function NotificationCard({ a }) {
  return (
    <article className="rounded-2xl border border-border bg-card p-5 hover:border-primary/40 transition">
      <div className="flex items-center justify-between text-xs">
        <span className="rounded-full border border-border bg-surface px-2 py-0.5 text-muted-foreground">{a.tag}</span>
        <div className="flex items-center gap-2 text-muted-foreground">
          {a.unread && <span className="h-1.5 w-1.5 rounded-full bg-primary" />}
          {a.time}
        </div>
      </div>
      <h4 className="mt-3 text-base font-semibold">{a.title}</h4>
      <p className="mt-1 text-sm text-muted-foreground">{a.body}</p>
    </article>
  );
}

export default Notifications;
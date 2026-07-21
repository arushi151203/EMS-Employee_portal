import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  CartesianGrid
} from "recharts";
import {
  Clock,
  CheckCircle2,
  CalendarDays,
  DollarSign,
  ChevronRight,
  FileDown,
  ListChecks,
  UserRound,
  MessagesSquare,
  LogOut as LogOutIcon
} from "lucide-react";
import { StatCard } from "@/components/common/StatCard";
import { StatusPill } from "@/components/common/StatusPill";
import {
  currentUser,
  dashboardStats,
  attendanceMonthly,
  recentTasks
} from "@/employee/lib/mock-data";
import { useStore } from "@/lib/store";

const iconMap = {
  clock: <Clock className="h-4 w-4" />,
  check: <CheckCircle2 className="h-4 w-4" />,
  calendar: <CalendarDays className="h-4 w-4" />,
  dollar: <DollarSign className="h-4 w-4" />
};
const quickActions = [
  { label: "Apply for Leave", to: "/leave", icon: CalendarDays },
  { label: "Download Payslip", to: "/payroll", icon: FileDown },
  { label: "View Tasks", to: "/tasks", icon: ListChecks },
  { label: "Update Profile", to: "/profile", icon: UserRound },
  { label: "Open Helpdesk", to: "/helpdesk", icon: MessagesSquare }
];
function fmtTime(d) {
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}
function todayKey() {
  return (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
}
function diffHours(inStr, outStr) {
  const [ih, im] = inStr.split(":").map(Number);
  const [oh, om] = outStr.split(":").map(Number);
  const mins = oh * 60 + om - (ih * 60 + im);
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return `${h}h ${m}m`;
}
function Dashboard() {
  const today = (/* @__PURE__ */ new Date()).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric"
  });
  const [punches, setPunches] = useStore("punches", {});
  const [nowTick, setNowTick] = useState(0);
  const key = todayKey();
  const punch = punches[key];
  const isCheckedIn = !!punch?.in && !punch?.out;
  useEffect(() => {
    if (!isCheckedIn) return;
    const id = setInterval(() => setNowTick((t) => t + 1), 6e4);
    return () => clearInterval(id);
  }, [isCheckedIn]);
  const handlePunch = () => {
    const now = fmtTime(/* @__PURE__ */ new Date());
    if (!punch?.in) {
      setPunches({ ...punches, [key]: { date: key, in: now } });
      toast.success(`Checked in at ${now}`);
    } else if (!punch.out) {
      const worked = diffHours(punch.in, now);
      setPunches({ ...punches, [key]: { ...punch, out: now } });
      toast.success(`Checked out at ${now} \xB7 ${worked} worked`);
    } else {
      toast.info("Already checked out for today");
    }
  };
  const workedNow = punch?.in && !punch.out ? diffHours(punch.in, fmtTime(/* @__PURE__ */ new Date())) : null;
  void nowTick;
  return <div className="space-y-6">
      {
    /* Welcome banner */
  }
      <div className="relative overflow-hidden rounded-2xl border border-border bg-gradient-banner p-6 sm:p-8">
        <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-primary/20 blur-3xl" />
        <div className="relative">
          <div className="text-sm text-primary/90">{today}</div>
          <h1 className="mt-1 text-3xl font-semibold tracking-tight">
            Good morning, {currentUser.firstName} <span className="inline-block">👋</span>
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {punch?.in && !punch.out ? `Checked in at ${punch.in} \xB7 ${workedNow} so far` : punch?.out ? `Wrapped up at ${punch.out} \u2014 great work today!` : "You have 3 tasks due this week and 2 pending reviews."}
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            <button
    onClick={handlePunch}
    disabled={!!punch?.out}
    className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium shadow-glow transition disabled:opacity-60 disabled:cursor-not-allowed ${isCheckedIn ? "bg-destructive text-destructive-foreground hover:bg-destructive/90" : "bg-gradient-primary text-primary-foreground"}`}
  >
              {isCheckedIn ? <LogOutIcon className="h-4 w-4" /> : <Clock className="h-4 w-4" />}
              {punch?.out ? "Checked out" : isCheckedIn ? "Check Out" : "Check In"}
            </button>
            <Link
    to="/tasks"
    className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface px-4 py-2 text-sm font-medium hover:bg-surface-elevated"
  >
              <ListChecks className="h-4 w-4" /> My Tasks
            </Link>
          </div>
        </div>
      </div>

      {
    /* Stats */
  }
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {dashboardStats.map((s) => {
    const to = s.label === "Attendance" ? "/attendance" : s.label === "Tasks done" ? "/tasks" : s.label === "Leave balance" ? "/leave" : "/payroll";
    return <Link key={s.label} to={to} className="block transition hover:scale-[1.01]">
              <StatCard label={s.label} value={s.value} sub={s.sub} tone={s.tone} icon={iconMap[s.icon]} />
            </Link>;
  })}
      </div>

      {
    /* Chart + quick actions */
  }
      <div className="grid gap-4 xl:grid-cols-3">
        <div className="xl:col-span-2 rounded-2xl border border-border bg-card p-5">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold">Attendance — last 6 months</h2>
            <span className="text-xs text-muted-foreground">Days present</span>
          </div>
          <div className="mt-4 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={attendanceMonthly} barSize={28}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="month" tick={{ fill: "var(--muted-foreground)", fontSize: 12 }} tickLine={false} axisLine={false} />
                <YAxis tick={{ fill: "var(--muted-foreground)", fontSize: 12 }} tickLine={false} axisLine={false} />
                <Tooltip
    cursor={{ fill: "var(--accent)", opacity: 0.4 }}
    contentStyle={{
      background: "var(--popover)",
      border: "1px solid var(--border)",
      borderRadius: 8,
      color: "var(--foreground)"
    }}
  />
                <Bar dataKey="days" fill="var(--chart-1)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5">
          <h2 className="text-sm font-semibold">Quick Actions</h2>
          <div className="mt-4 space-y-1">
            {quickActions.map((a) => <Link
    key={a.label}
    to={a.to}
    className="flex items-center justify-between rounded-lg px-3 py-2.5 text-sm hover:bg-accent"
  >
                <span className="flex items-center gap-3">
                  <a.icon className="h-4 w-4 text-primary" />
                  {a.label}
                </span>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </Link>)}
          </div>
        </div>
      </div>

      {
    /* Recent tasks */
  }
      <div className="rounded-2xl border border-border bg-card p-5">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold">Recent Tasks</h2>
          <Link to="/tasks" className="text-xs text-primary hover:underline">View all</Link>
        </div>
        <div className="mt-4 divide-y divide-border">
          {recentTasks.slice(0, 4).map((t) => <div key={t.id} className="flex items-center justify-between gap-3 py-3">
              <div className="flex min-w-0 items-center gap-3">
                <span
    className={`h-2 w-2 shrink-0 rounded-full ${t.priority === "urgent" ? "bg-destructive" : t.priority === "high" ? "bg-warning" : t.priority === "medium" ? "bg-info" : "bg-muted-foreground"}`}
  />
                <span className={`truncate text-sm ${t.status === "done" ? "line-through text-muted-foreground" : ""}`}>
                  {t.title}
                </span>
              </div>
              <div className="flex shrink-0 items-center gap-3">
                <StatusPill status={t.status} />
                <span className="text-xs text-muted-foreground">{t.due}</span>
              </div>
            </div>)}
        </div>
      </div>
    </div>;
}
export default Dashboard;


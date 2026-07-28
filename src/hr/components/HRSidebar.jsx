import { NavLink, useNavigate } from "react-router-dom";
import {
  Layers,
  LayoutDashboard,
  Users,
  CalendarCheck,
  Briefcase,
  Building2,
  TrendingUp,
  LogOut
} from "lucide-react";
import { useRole, useUser, roleLabels, logout } from "@/lib/auth";

const navItems = [
  { label: "Overview", to: "/hr", icon: LayoutDashboard, end: true },
  { label: "Employees", to: "/hr/employees", icon: Users },
  { label: "Leave Approval", to: "/hr/leave-approval", icon: CalendarCheck },
  { label: "Recruitment", to: "/hr/recruitment", icon: Briefcase },
  { label: "Departments", to: "/hr/departments", icon: Building2 },
  { label: "Performance", to: "/hr/performance", icon: TrendingUp }
];

function HRSidebar() {
const navigate = useNavigate();
  const role = useRole();
  const user = useUser();
  const initials = user?.name
    ? user.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()
    : "?";

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

  return (
    <aside className="flex h-screen w-60 shrink-0 flex-col border-r border-border bg-card">
      <div className="flex items-center gap-2.5 px-5 py-5">
        <div className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-primary shadow-glow">
          <Layers className="h-4.5 w-4.5 text-primary-foreground" />
        </div>
        <div className="font-semibold">Nexus HR</div>
      </div>

      <div className="px-5 pb-2 pt-2 text-[11px] font-medium tracking-wider text-muted-foreground">
        HR PORTAL
      </div>

      <nav className="flex-1 space-y-1 px-3">
        {navItems.map((item) => (
          <NavLink
            key={item.label}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition ${
                isActive
                  ? "bg-gradient-primary text-primary-foreground shadow-glow"
                  : "text-muted-foreground hover:bg-accent hover:text-foreground"
              }`
            }
          >
            <item.icon className="h-4 w-4" />
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-border p-3">
        <div className="flex items-center gap-3 rounded-lg px-2 py-2">
          <div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-primary text-xs font-semibold text-primary-foreground shrink-0">
            {initials}
          </div>
          <div className="min-w-0 flex-1">
            <div className="truncate text-sm font-medium">{user?.name || "Guest"}</div>
            <div className="truncate text-xs text-muted-foreground">{roleLabels[role]}</div>
          </div>
          <button
            onClick={handleLogout}
            className="text-muted-foreground hover:text-foreground"
            aria-label="Sign out"
            title="Sign out"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}

export default HRSidebar;

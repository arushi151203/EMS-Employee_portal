import { NavLink } from "react-router-dom";
import {
  BarChart3,
  FileBarChart2,
  Users,
  Wallet,
  FileSearch,
  Settings,
  LogOut,
} from "lucide-react";

const menuItems = [
  {
    title: "Analytics",
    icon: BarChart3,
    path: "/analytics",
  },
  {
    title: "Reports",
    icon: FileBarChart2,
    path: "/reports",
  },
  {
    title: "User Management",
    icon: Users,
    path: "#",
  },
  {
    title: "Payroll",
    icon: Wallet,
    path: "#",
  },
  {
    title: "Audit Logs",
    icon: FileSearch,
    path: "#",
  },
  {
    title: "Settings",
    icon: Settings,
    path: "#",
  },
];

function Sidebar() {
  return (
    <aside className="w-72 min-h-screen bg-[#111827] border-r border-slate-700 flex flex-col">

      {/* Logo */}
      <div className="h-20 flex items-center justify-center border-b border-slate-700">
        <h1 className="text-2xl font-bold text-white">
          HR Dashboard
        </h1>
      </div>

      {/* Menu */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.title}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-slate-300 hover:bg-slate-800"
                }`
              }
            >
              <Icon size={20} />
              <span>{item.title}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="border-t border-slate-700 p-4">
        <button className="flex items-center gap-3 text-red-400 hover:text-red-300">
          <LogOut size={20} />
          Logout
        </button>
      </div>

    </aside>
  );
}

export default Sidebar;
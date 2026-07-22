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
    <aside className="w-72 bg-[#111827] border-r border-slate-700 min-h-screen flex flex-col justify-between">

      <div>

        <div className="p-6 border-b border-slate-700">
          <h1 className="text-2xl font-bold text-white">
           Admin Portal
          </h1>

          {/* <p className="text-slate-400 text-sm mt-1">
            Admin Portal
          </p> */}
        </div>

        <nav className="p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.title}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    isActive
                      ? "bg-blue-600 text-white"
                      : "text-slate-300 hover:bg-slate-800"
                  }`
                }
              >
                <Icon size={20} />
                {item.title}
              </NavLink>
            );
          })}
        </nav>

      </div>

      <div className="p-4 border-t border-slate-700">
        <button className="flex items-center gap-3 text-red-400 hover:text-red-300">
          <LogOut size={20} />
          Logout
        </button>
      </div>

    </aside>
  );
}

export default Sidebar;
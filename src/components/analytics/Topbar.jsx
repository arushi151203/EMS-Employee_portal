import { Search, UserCircle } from "lucide-react";

function Topbar() {
  return (
    <header className="h-20 bg-[#111827] border-b border-slate-700 flex items-center justify-between px-8">
      {/* Search */}
      <div className="relative w-96">
        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
        />

        <input
          type="text"
          placeholder="Search..."
          className="w-full bg-[#1E293B] border border-slate-700 rounded-xl py-3 pl-12 pr-4 text-white placeholder:text-slate-400 outline-none focus:border-blue-500"
        />
      </div>

      {/* User Profile */}
      <div className="flex items-center gap-4">
        <UserCircle size={42} className="text-blue-500" />

        <div>
          <h3 className="text-white font-semibold text-lg">
            James Rodriguez
          </h3>

          <p className="text-slate-400 text-sm">
            Administrator
          </p>
        </div>
      </div>
    </header>
  );
}

export default Topbar;
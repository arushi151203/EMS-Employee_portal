import { Bell, Search, UserCircle } from "lucide-react";

function Topbar() {
  return (
    <header className="h-20 bg-[#111827] border-b border-slate-700 flex items-center justify-between px-8">

      {/* Search Bar */}
      <div className="relative w-96">
        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
        />

        <input
          type="text"
          placeholder="Search..."
          className="w-full bg-[#1E293B] text-white rounded-xl py-3 pl-10 pr-4 outline-none border border-slate-700 focus:border-blue-500"
        />
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-6">

        {/* <button className="relative">
          <Bell className="text-slate-300" size={22} />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button> */}

        <div className="flex items-center gap-3">
          <UserCircle size={36} className="text-blue-400" />

          <div>
            <p className="text-white font-medium">
              James Rodriguez
            </p>

            <p className="text-slate-400 text-sm">
              Administrator
            </p>
          </div>
        </div>

      </div>

    </header>
  );
}

export default Topbar;
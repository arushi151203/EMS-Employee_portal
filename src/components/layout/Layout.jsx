import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

function Layout({ children }) {
  return (
    <div className="flex min-h-screen bg-[#030712]">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">

        {/* Top Navigation */}
        <Topbar />

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-8">
          {children}
        </main>

      </div>

    </div>
  );
}

export default Layout;
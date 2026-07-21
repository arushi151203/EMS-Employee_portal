import { Outlet } from "react-router-dom";
import HRSidebar from "./HRSidebar";
import HRTopBar from "./HRTopBar";

function HRShell() {
  return (
    <div className="flex h-screen bg-background">
      <HRSidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <HRTopBar />
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default HRShell;

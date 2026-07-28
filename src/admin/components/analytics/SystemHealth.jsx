import HealthCard from "./HealthCard";
import { systemHealth } from "../../data/analyticsData";

function SystemHealth() {
  return (
    <div className="bg-[#111827] border border-slate-700 rounded-2xl p-6 mt-8">

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-white text-3xl font-bold">
          System Health
        </h2>

        <button className="text-slate-400 hover:text-white">
          Refresh
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {systemHealth.map((item, index) => (
          <HealthCard
            key={index}
            title={item.title}
            uptime={item.uptime}
            latency={item.latency}
            status={item.status}
          />
        ))}
      </div>
    </div>
  );
}

export default SystemHealth;

import Layout from "../components/layout/Layout";

import StatCard from "../components/analytics/StatCard";
import EmployeeGrowthChart from "../components/analytics/EmployeeGrowthChart";
import PayrollChart from "../components/analytics/PayrollChart";
import SystemHealth from "../components/analytics/SystemHealth";

import { stats } from "../data/analyticsData";

function Analytics() {
  return (
    <Layout>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white">
          Analytics
        </h1>

        <p className="text-slate-400 mt-2">
          Company-wide metrics and insights
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {stats.map((card, index) => (
          <StatCard
            key={index}
            title={card.title}
            value={card.value}
            subtitle={card.subtitle}
            icon={card.icon}
          />
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-8">
        <EmployeeGrowthChart />
        <PayrollChart />
      </div>

      {/* System Health */}
      <div className="mt-8">
        <SystemHealth />
      </div>
    </Layout>
  );
}

export default Analytics;
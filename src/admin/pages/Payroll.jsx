import { useState } from "react";
import { toast } from "sonner";
import { RefreshCw, DollarSign, Users, TrendingUp, Calendar, Download } from "lucide-react";
import { StatCard } from "@/components/common/StatCard";
import { payrollStats, departments, payrollHistory } from "../data/payrollData";

const icons = [DollarSign, Users, TrendingUp, Calendar];
const tones = ["success", "info", "violet", "warning"];

function Payroll() {
  const [loading, setLoading] = useState(false);

  const runPayroll = () => {
    setLoading(true);
    setTimeout(() => {
      toast.success("Payroll processed successfully!");
      setLoading(false);
    }, 2000);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Payroll Processing</h1>
          <p className="text-sm text-muted-foreground mt-1">Salary structures and payroll management</p>
        </div>
        <button
          onClick={runPayroll}
          disabled={loading}
          className="flex items-center gap-2 rounded-lg bg-primary text-primary-foreground px-4 py-2 text-sm font-medium hover:opacity-90 disabled:opacity-70"
        >
          <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
          {loading ? "Processing..." : "Run Payroll"}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
        {payrollStats.map((item, index) => {
          const Icon = icons[index];
          return (
            <StatCard key={item.title} label={item.title} value={item.value} sub={item.subtitle} icon={<Icon size={16} />} tone={tones[index]} />
          );
        })}
      </div>

      <div className="rounded-2xl border border-border bg-card p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4">Salary Structure by Department</h2>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-muted-foreground border-b border-border">
              <th className="py-3 font-medium">Department</th>
              <th className="py-3 font-medium">Average</th>
              <th className="py-3 font-medium">Minimum</th>
              <th className="py-3 font-medium">Maximum</th>
              <th className="py-3 font-medium">Employees</th>
              <th className="py-3 font-medium">Monthly Cost</th>
            </tr>
          </thead>
          <tbody>
            {departments.map((dept) => (
              <tr key={dept.department} className="border-b border-border last:border-0">
                <td className="py-3">{dept.department}</td>
                <td className="py-3">{dept.avg}</td>
                <td className="py-3">{dept.min}</td>
                <td className="py-3">{dept.max}</td>
                <td className="py-3">{dept.headcount}</td>
                <td className="py-3">{dept.cost}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="rounded-2xl border border-border bg-card p-6">
        <h2 className="text-lg font-semibold mb-4">Payroll History</h2>
        <div className="space-y-3">
          {payrollHistory.map((item) => (
            <div key={item.month} className="flex items-center justify-between rounded-xl bg-accent p-4">
              <div>
                <h3 className="font-medium">{item.month}</h3>
                <p className="text-sm text-muted-foreground mt-1">{item.employees} Employees</p>
              </div>
              <div className="flex items-center gap-4">
                <strong>{item.amount}</strong>
                <span className="text-xs font-medium px-3 py-1 rounded-full bg-green-500/15 text-green-400">{item.status}</span>
                <button className="text-muted-foreground hover:text-foreground">
                  <Download size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Payroll;
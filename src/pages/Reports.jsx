import { useState } from "react";
import Layout from "../components/layout/Layout";
import ReportTabs from "../components/analytics/ReportTabs";
import ExportMenu from "../components/common/ExportMenu";

import { reports } from "../data/reportsData";

import { exportPDF } from "../utils/exportPDF";
import { exportExcel } from "../utils/exportExcel";
import { exportCSV } from "../utils/exportCSV";

function Reports() {
  const [activeTab, setActiveTab] = useState("Headcount");

  const currentReport = reports[activeTab];

  return (
    <Layout>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-5xl font-bold text-white">
            Reports & Analytics
          </h1>

          <p className="text-slate-400 mt-2">
            Interactive data reports across all modules
          </p>
        </div>

        <ExportMenu
          onPDF={() =>
            exportPDF(activeTab, currentReport.lineChart)
          }
          onExcel={() =>
            exportExcel(activeTab, currentReport.lineChart)
          }
          onCSV={() =>
            exportCSV(activeTab, currentReport.lineChart)
          }
          onPrint={() => window.print()}
        />
      </div>

      <ReportTabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
    </Layout>
  );
}

export default Reports;
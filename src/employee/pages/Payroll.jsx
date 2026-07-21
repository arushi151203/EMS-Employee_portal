import "./Payroll.css";
import payrollData from "../data/payrollData";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function formatMoney(amount) {
  const sign = amount < 0 ? "-" : "";
  return `${sign}$${Math.abs(amount).toLocaleString(undefined, {
    minimumFractionDigits: 2,
  })}`;
}

function Payroll() {
  const { payslip, ytdSummary, pastPayslips, netPayTrend } = payrollData;

  return (
    <div className="payroll-page">
      <h1>Payroll</h1>
      <p className="payroll-subtitle">View payslips and compensation details</p>

      <div className="payroll-grid">
        {/* Left: Payslip card */}
        <div className="card payslip-card">
          <div className="payslip-header">
            <div>
              <p className="payslip-label">PAYSLIP</p>
              <h2>{payslip.month}</h2>
            </div>
            <button className="btn-primary download-btn">Download PDF</button>
          </div>

          <div className="payslip-columns">
            <div>
              <p className="column-heading">EARNINGS</p>
              {payslip.earnings.map((item) => (
                <div className="line-row" key={item.label}>
                  <span>{item.label}</span>
                  <span>{formatMoney(item.amount)}</span>
                </div>
              ))}
              <div className="line-row total-row">
                <span>Gross Total</span>
                <span className="amount-positive">
                  {formatMoney(payslip.grossTotal)}
                </span>
              </div>
            </div>

            <div>
              <p className="column-heading">DEDUCTIONS</p>
              {payslip.deductions.map((item) => (
                <div className="line-row" key={item.label}>
                  <span>{item.label}</span>
                  <span className="amount-negative">
                    {formatMoney(item.amount)}
                  </span>
                </div>
              ))}
              <div className="line-row total-row">
                <span>Total Deductions</span>
                <span className="amount-negative">
                  {formatMoney(payslip.totalDeductions)}
                </span>
              </div>
            </div>
          </div>

          <div className="net-pay-box">
            <div>
              <p className="net-pay-label">Net Pay</p>
              <h2>{formatMoney(payslip.netPay)}</h2>
            </div>
            <div className="paid-on">
              <p className="net-pay-label">Paid on</p>
              <p>{payslip.paidOn}</p>
            </div>
          </div>
        </div>

        {/* Right: YTD Summary */}
        <div className="card ytd-card">
          <h3>YTD Summary</h3>
          <div className="ytd-row">
            <span>Gross Earned</span>
            <span>{formatMoney(ytdSummary.grossEarned)}</span>
          </div>
          <div className="ytd-row">
            <span>Total Deductions</span>
            <span className="amount-negative">
              {formatMoney(ytdSummary.totalDeductions)}
            </span>
          </div>
          <div className="ytd-row">
            <span>Net Received</span>
            <span className="amount-positive">
              {formatMoney(ytdSummary.netReceived)}
            </span>
          </div>
          <div className="ytd-row">
            <span>Taxes Paid</span>
            <span className="amount-warning">
              {formatMoney(ytdSummary.taxesPaid)}
            </span>
          </div>

          <p className="past-payslips-heading">Past Payslips</p>
          {pastPayslips.map((item) => (
            <div className="line-row past-payslip-row" key={item.month}>
              <span>{item.month}</span>
              <span className="download-icon">⬇</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom: Net Pay Trend chart */}
      <div className="card trend-card">
        <h3>Net Pay Trend — 2024</h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={netPayTrend}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1f2740" />
            <XAxis dataKey="month" stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Tooltip
              contentStyle={{ background: "#131a2c", border: "1px solid #1f2740" }}
            />
            <Line type="monotone" dataKey="gross" stroke="#38bdf8" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="net" stroke="#3b82f6" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default Payroll;
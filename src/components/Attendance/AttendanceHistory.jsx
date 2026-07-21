import "./AttendanceHistory.css";
import { useState, useEffect } from "react";
import { getHistory } from "./services/attendanceService";


function AttendanceHistory() {

  const employeeId = 1;
  const [search] = useState("");
  const [attendance, setAttendance] = useState([]);

  const filteredData = attendance.filter(item =>
    item.attendance_date
        ?.toLowerCase()
        .includes(search.toLowerCase())
);

 useEffect(() => {
    async function loadHistory() {
      try {

        const res = await getHistory(employeeId);

        setAttendance(res.data);

      } catch (error) {

        console.error(error);
      }
    };
    loadHistory();
  }, []);

  return (

    <div className="card attendance-history">

      <div className="history-header">
        <h2>Attendance History</h2>
      </div>

      <table>

        <thead>

          <tr>

            <th>Date</th>

            <th>Day</th>

            <th>Check In</th>

            <th>Check Out</th>

            <th>Break</th>

            <th>Hours</th>

            <th>Status</th>

          </tr>

        </thead>

        <tbody>

          {filteredData.map((item,index)=>(

            <tr key={index}>

              <td>   
                 {new Date(item.attendance_date).toLocaleDateString()}
              </td>

              <td>
                {item.day}
              </td>

              <td>
                {item.check_in || "--"}
              </td>

              <td>
                {item.check_out || "--"}
              </td>

              <td>
                {item.break_time || "00:00:00"}
              </td>

              <td>
                {item.working_hours || "00:00:00"}
              </td>
              
              <td>
                <span
                  className={`status-badge ${item.status.toLowerCase()}`}
                >

                  {item.status}

                </span>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );

}

export default AttendanceHistory;
import "./AttendanceCalendar.css";
import { useState, useEffect, useMemo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getCalendar } from "./services/attendanceService";

function AttendanceCalendar() {

  const employeeId = "EMP001";
  const today = new Date();

  const [currentDate, setCurrentDate] = useState(today);
  const [calendarData, setCalendarData] = useState([]);

  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();

  const monthName = currentDate.toLocaleString("default", {
    month: "long",
  });

  useEffect(() => {
    async function loadCalendar() {
      try {
        const res = await getCalendar(employeeId,month + 1,year);

        setCalendarData(res.data);

      } catch (err) {

        console.error("Calendar API Error", err);

      }
    };
    loadCalendar();
  }, [month, year]);

  // -----------Convert DB rows to lookup-----------

  const attendanceMap = useMemo(() => {

    const map = {};
    calendarData.forEach((item) => {

      map[item.day] = item.status.toLowerCase();

    });
    return map;

  }, [calendarData]);


  // ----------Calendar calculations-----------

  const totalDays = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();

  const cells = useMemo(() => {
    const arr = [];

    // Blank cells
    for (let i = 0; i < firstDay; i++) {
      arr.push(null);
    }

    // Days
    for (let day = 1; day <= totalDays; day++) {
      arr.push({day, status: attendanceMap[day] || ""});
    }
    return arr;

  }, [firstDay, totalDays, attendanceMap]);

  // ------------Month Navigation-------------

  function previousMonth() {

    setCurrentDate(
      new Date(year, month - 1, 1)
    );

  }

  function nextMonth() {

    setCurrentDate(
      new Date(year, month + 1, 1)
    );

  }

  return (

    <div className="attendance-calendar">

      {/* Header */}

      <div className="calendar-header">

        <button
          className="calendar-nav-btn"
          onClick={previousMonth}
        >
          <ChevronLeft size={14} />
        </button>
        
          {monthName} {year}

        <button
          className="calendar-nav-btn"
          onClick={nextMonth}
        >
          <ChevronRight size={14} />
        </button>

      </div>

      {/* Calendar */}

      <div className="calendar-grid-wrapper">

        {/* Weekday header */}

        <div className="calendar-grid weekday-header">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
            <div key={d} className="calendar-weekday-label">{d}</div>
          ))}
        </div>

        {/* Dates */}

        <div className="calendar-grid">

          {cells.map((cell, index) => {

            if (!cell) return <div key={index} className="calendar-card empty" />;

            const cellDate = new Date(year, month, cell.day);

            const todayDate = new Date();
            todayDate.setHours(0, 0, 0, 0);

            const isToday =cellDate.getTime() === todayDate.getTime();
            const isFuture = cellDate > todayDate;

            return (

              <div
                key={index}
                className={`calendar-card
                ${cell.status}
                ${isToday ? "today" : ""}
                ${isFuture ? "future" : ""}
                `}>

                <span className="calendar-date">
                  {cell.day}
                </span>

              </div>
            );
          })}

        </div>

      </div>

      {/* Legend */}

      <div className="calendar-legend">

        <div>

          <span className="dot present"></span>

          Present

        </div>

        <div>

          <span className="dot absent"></span>

          Absent

        </div>

        <div>

          <span className="dot late"></span>

          Late

        </div>

      </div>

    </div>

  );

}

export default AttendanceCalendar;
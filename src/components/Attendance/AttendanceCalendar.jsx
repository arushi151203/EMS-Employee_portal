import "./AttendanceCalendar.css";
import { useState, useEffect, useMemo, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getCalendar } from "./services/attendanceService";

function AttendanceCalendar() {

  const employeeId = 1;
  const today = new Date();

  const scrollRef = useRef(null);
  const todayRef = useRef(null);

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

  useEffect(() => {
    if (!scrollRef.current || !todayRef.current) return;

    const container = scrollRef.current;
    const today = todayRef.current;

    const left = today.offsetLeft - container.clientWidth / 2 + today.clientWidth / 2;

    container.scrollTo({
      left,
      behavior: "smooth",
    });
  }, [calendarData, month, year]);

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

      <div className="calendar-scroll" ref={scrollRef}>

        {/* Dates */}

        <div className="calendar-row dates">

          {cells.map((cell, index) => {

            if (!cell) return null;

            const cellDate = new Date(year, month, cell.day);
            const dayName = cellDate.toLocaleDateString("en-CA", {weekday: "short",});

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

                <span className="calendar-weekday">
                  {dayName}
                </span>

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
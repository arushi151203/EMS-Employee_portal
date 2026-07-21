import "./AttendanceStatus.css";
import { useState, useEffect } from "react";
import {Coffee, Clock3} from "lucide-react";
import {checkIn, checkOut, getToday, updateBreak} from "./services/attendanceService";
const employeeId = 1;

function AttendanceStatus() {
  const [attendance, setAttendance] = useState(null);
  const [checkedIn, setCheckedIn] = useState(false);
  const [onBreak, setOnBreak] = useState(false);
  const [breakSeconds, setBreakSeconds] = useState(0);
  const [checkInTime, setCheckInTime] = useState("--");
  const [checkOutTime, setCheckOutTime] = useState("--");
  const [workingHours, setWorkingHours] = useState("--");

  useEffect(() => {
    loadAttendance();
  }, []);

  const currentDate = new Date().toLocaleDateString("en-CA", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  async function loadAttendance() {

    try {

    const res = await getToday(employeeId);

    if (res.data && res.data.check_in && !res.data.check_out) {

      setCheckedIn(true);
    } else {

      setCheckedIn(false);
    }
    setAttendance(res.data);

  } catch (err) {

    console.log(err);

  }

}

const handleCheckIn = async () => {

  console.log("Check In button clicked");

  try{
    const res = await checkIn(employeeId);
    console.log(res.data);
    setCheckedIn(true);

    setCheckInTime(new Date().toLocaleTimeString());

    loadAttendance();
  } catch (error) {
    console.error(error);
  }

};

useEffect(() => {

    let timer;

    if (onBreak) {

        timer = setInterval(() => {

            setBreakSeconds(prev => prev + 1);

        },1000);

    }

    return () => clearInterval(timer);

},[onBreak]);

const handleBreak = async () => {
  if (onBreak) {
    try {
      await updateBreak(employeeId, breakSeconds);
      console.log("Break updated:", breakSeconds);
    } catch (err) {
      console.log(err);
    }

  }

  setOnBreak(!onBreak);
};

const formatTime = (seconds) => {

    const hrs = String(Math.floor(seconds / 3600)).padStart(2,"0");

    const mins = String(Math.floor((seconds % 3600) / 60)).padStart(2,"0");

    const secs = String(seconds % 60).padStart(2,"0");

    return `${hrs}:${mins}:${secs}`;

};

async function handleCheckOut() {

    await checkOut(employeeId);

    setCheckedIn(false);

    setOnBreak(false);

    setCheckOutTime(new Date().toLocaleTimeString());

    loadAttendance();

}

  return (
    <div className="card attendance-status">

      <div className="clock-wrapper">

        <div className="clock-circle">

          <Clock3 size={60} strokeWidth={1.2} />

        </div>

      </div>

      {/* Status */}

      <div className={`status-badge ${checkedIn ? "checked-in" : "not-checked"}`}>
        {checkedIn ? "Checked In" : "Not Checked In"}
      </div>

      {/* Date */}

      <p className="today-date">
        {currentDate}
      </p>

      {/* Buttons */}

      <div className="attendance-buttons">

        <button
          className={checkedIn ? "checkout-btn" : "checkin-btn"}
          onClick={checkedIn ? handleCheckOut : handleCheckIn}>
          {checkedIn ? "Check Out" : "Check In"}

        </button>

        <button className="secondary-btn" disabled={!checkedIn} onClick={handleBreak}>

          <Coffee size={18} />

          {onBreak ? "Resume" : "Break"}

        </button>

      </div>

      {/* Summary */}
      <div className="attendance-details">

        <div className="detail-row">
          <span>Check In</span>
          <strong>{checkInTime}</strong>
        </div>

        <div className="detail-row">
          <span>Check Out</span>
          <strong>{checkOutTime}</strong>
        </div>

        <div className="detail-row">
          <span>Break</span>
          <strong>{formatTime(breakSeconds)}</strong>
        </div>

        <div className="detail-row">
          <span>Working Hours</span>
          <strong>{workingHours}</strong>
        </div>

        <div className="detail-row">
          <span>Status</span>

          <strong className={checkedIn ? "status-present" : "status-absent"}>
            {checkedIn ? "Present" : "Absent"}
          </strong>
        </div>
      </div>
    </div>
  );
}
export default AttendanceStatus;
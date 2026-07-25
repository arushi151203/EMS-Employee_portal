import "./AttendanceStatus.css";
import { useState, useEffect } from "react";
import {Coffee, Clock3} from "lucide-react";
import {checkIn, checkOut, getToday, updateBreak} from "./services/attendanceService";
const employeeId = "EMP001";

function AttendanceStatus() {
  const [attendance, setAttendance] = useState(null);
  const [checkedIn, setCheckedIn] = useState(false);
  const [onBreak, setOnBreak] = useState(false);
  const [breakSeconds, setBreakSeconds] = useState(0);
  const [checkInTime, setCheckInTime] = useState("--");
  const [checkOutTime, setCheckOutTime] = useState("--");
  const [workingHours, setWorkingHours] = useState("--");
  const [isProcessing, setIsProcessing] = useState(false);
  const [infoMessage, setInfoMessage] = useState("");

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

    if (res.data) {
      setCheckInTime(res.data.check_in ? new Date(res.data.check_in).toLocaleTimeString() : "--");
      setCheckOutTime(res.data.check_out ? new Date(res.data.check_out).toLocaleTimeString() : "--");
      setBreakSeconds(res.data.break_seconds || 0);
      setWorkingHours(res.data.working_seconds ? formatTime(res.data.working_seconds) : "--");
    } else {
      setCheckInTime("--");
      setCheckOutTime("--");
      setBreakSeconds(0);
      setWorkingHours("--");
    }

  } catch (err) {

    console.log(err);

  }

}

const handleCheckIn = async () => {

  if (isProcessing) return;
  setIsProcessing(true);
  setInfoMessage("");

  console.log("Check In button clicked");

  try{
    const res = await checkIn(employeeId);
    console.log(res.data);

    if (res.data && res.data.message === "Already Checked In Today") {
      setInfoMessage("You've already completed attendance for today.");
    } else {
      setCheckInTime(new Date().toLocaleTimeString());
    }

    loadAttendance();
  } catch (error) {
    console.error(error);
  } finally {
    setIsProcessing(false);
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

    if (isProcessing) return;
    setIsProcessing(true);

    console.log("Check Out button clicked");

    try {

      const res = await checkOut(employeeId);
      console.log(res.data);

      setCheckedIn(false);

      setOnBreak(false);

      setCheckOutTime(new Date().toLocaleTimeString());

      loadAttendance();

    } catch (error) {
      console.error("Check out failed:", error);
    } finally {
      setIsProcessing(false);
    }

}

  const dayCompleted = !!(attendance && attendance.check_in && attendance.check_out);

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

      {infoMessage && (
        <p className="info-message">{infoMessage}</p>
      )}

      {/* Date */}

      <p className="today-date">
        {currentDate}
      </p>

      {/* Buttons */}

      <div className="attendance-buttons">

        <button
          className={checkedIn ? "checkout-btn" : "checkin-btn"}
          disabled={isProcessing || dayCompleted}
          onClick={checkedIn ? handleCheckOut : handleCheckIn}>
          {isProcessing ? "..." : dayCompleted ? "Completed for Today" : (checkedIn ? "Check Out" : "Check In")}

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

          <strong className={attendance && attendance.status === "Present" ? "status-present" : "status-absent"}>
            {attendance && attendance.status ? attendance.status : "Absent"}
          </strong>
        </div>
      </div>
    </div>
  );
}
export default AttendanceStatus;
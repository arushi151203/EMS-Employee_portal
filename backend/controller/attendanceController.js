const db = require("../db");

exports.checkIn = (req, res) => {

    console.log("CHECH IN API CALLED");
    console.log(req.body);

    const { employee_id } = req.body;
    const today = new Date().toISOString().slice(0, 10);

    db.query(
        "SELECT * FROM attendance WHERE employee_id=? AND attendance_date=?",
        [employee_id, today],
        (err, rows) => {
            if (err) {
                console.log("SELECT ERROR:",err);
                return res.status(500).json(err);
            }
            console.log("Rows Found:",rows);

            if (rows.length > 0) {
                return res.json({
                    message: "Already Checked In Today",
                });
            }

            db.query(
                `INSERT INTO attendance
                (employee_id, attendance_date, check_in, status)
                VALUES (?, ?, NOW(), 'Present')`,
                [employee_id, today],
                (err, result) => {
                    if (err) {
                        console.log("INSERT ERROR:",err);
                        return res.status(500).json(err);
                    }
                    console.log("inserted:",result);

                    res.json({
                        message: "Checked In Successfully",
                    });
                }
            );
        }
    );
};

// ----------------CHECK OUT-------------------

exports.checkOut = (req, res) => {

    const { employee_id } = req.body;
    const today = new Date().toISOString().slice(0,10);

    db.query(
        "SELECT * FROM attendance WHERE employee_id=? AND attendance_date=?",
        [employee_id, today],
        (err, rows) => {
            if(err) return res.status(500).json(err);

            if(rows.length===0){
                return res.json({
                    message:"Check In First"
                });
            }
            const attendance = rows[0];
            const checkInTime = new Date(attendance.check_in);
            const checkOutTime = new Date();
            const breakSeconds = attendance.break_seconds || 0;
            const totalSeconds = Math.floor((checkOutTime - checkInTime)/1000);
            const workingSeconds = totalSeconds - breakSeconds;

            db.query(
                `UPDATE attendance
                 SET check_out=?,
                 working_seconds=?
                 WHERE employee_id=?
                 AND attendance_date=?`,
                [
                    checkOutTime,
                    workingSeconds,
                    employee_id,
                    today
                ],
                (err)=>{
                    if(err)
                        return res.status(500).json(err);

                    res.json({
                        message:"Checked Out Successfully"
                    });

                }
            );

        }
    );

};

// ------------------TODAY---------------------

exports.getTodayAttendance = (req, res) => {

    const employeeId = req.params.employeeId;
    const today = new Date().toISOString().slice(0, 10);
    const sql = `
        SELECT *
        FROM attendance
        WHERE employee_id = ?
        AND attendance_date = ?
    `;

    db.query(sql, [employeeId, today], (err, result) => {
        if (err)
            return res.status(500).json(err);

        res.json(result[0] || null);

    });

};

//-----------------Break------------------

exports.updateBreak = (req,res)=>{

    const { employee_id, break_seconds } = req.body;
    const today = new Date().toLocaleDateString("en-CA");

    db.query(
        `UPDATE attendance
         SET break_seconds=?
         WHERE employee_id=?
         AND attendance_date=?`,

        [
            break_seconds,
            employee_id,
            today
        ],

        (err)=>{
            if(err)
                return res.status(500).json(err);

            res.json({
                message:"Break Updated"
            });

        }

    );

};

// ---------------HISTORY-----------------

exports.getAttendanceHistory = (req, res) => {

    const employeeId = req.params.employeeId;
    const sql = `
        SELECT
        attendance_date,
        DAYNAME(attendance_date) AS day,
        TIME_FORMAT(check_in,'%h:%i %p') AS check_in,
        TIME_FORMAT(check_out,'%h:%i %p') AS check_out,
        SEC_TO_TIME(break_seconds) AS break_time,
        SEC_TO_TIME(working_seconds) AS working_hours,
        status
        FROM attendance
        WHERE employee_id=?
        ORDER BY attendance_date DESC
    `;

    db.query(sql, [employeeId], (err, result) => {
        if (err)
            return res.status(500).json(err);

        res.json(result);

    });

};

// --------------CALENDAR------------------

exports.getCalendarData = (req, res) => {

    const employeeId = req.params.employeeId;
    const month = parseInt(req.query.month);
    const year = parseInt(req.query.year);
    const sql = `
        SELECT
        DAY(attendance_date) AS day,
        status
        FROM attendance
        WHERE employee_id = ?
        AND MONTH(attendance_date) = ?
        AND YEAR(attendance_date) = ?
    `;

    db.query(sql, [employeeId, month, year], (err, result) => {
        if (err)
            return res.status(500).json(err);

        res.json(result);

    });

};
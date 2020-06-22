/* To get attendance status of a student from a school.
 * JWT is verified.
 */

const jwt = require("jsonwebtoken");
const config = require("config");
const bcrypt = require("bcryptjs");
const Attendance = require("../../../models/Attendance");
const Schools = require("../../../models/Schools");
const express = require("express");
const router = express.Router();
const authVerify = require("../../../customMiddleware/authVerify");
const ObjectID = require("mongodb").ObjectID;

// @route    POST api/students/attendanceStatus
// @desc     To get student's attendance status
// @access   Public (Used by student)
router.post("/", async (req, res) => {
  const {
    schoolId,
    studentId,
    type,
    month,
    year,
    startDate,
    endDate,
  } = req.body;
  if (type == null) {
    return res
      .status(400)
      .json({ errors: ["Select one of the attendance options"] });
  } else {
    if (type == "monthly") {
      if (month == null || year == null) {
        return res.status(400).json({ errors: ["Select a month and a year"] });
      }
    } else if (type == "specific") {
      if (startDate == null || endDate == null) {
        return res
          .status(400)
          .json({ errors: ["Select a start date and an end date"] });
      }
    }
  }
  console.log(req.body);
  try {
    let attendance;
    let isoDateFrom;
    let isoDateTo;
    if (type == "monthly") {
      isoDateFrom = new Date(year, month - 1, 1);
      isoDateTo = new Date(year, month - 1, 31);

      attendance = await Attendance.find({
        schoolId: new ObjectID(schoolId),
        studentId: new ObjectID(studentId),
        date: { $gte: isoDateFrom, $lte: isoDateTo },
      }).sort({ date: -1 });
    } else if (type == "specific") {
      isoDateFrom = new Date(startDate);
      isoDateTo = new Date(endDate);

      attendance = await Attendance.find({
        schoolId: new ObjectID(schoolId),
        studentId: new ObjectID(studentId),
        date: { $gte: isoDateFrom, $lte: isoDateTo },
      }).sort({ date: -1 });
    } else {
      attendance = await Attendance.find({
        schoolId: new ObjectID(schoolId),
        studentId: new ObjectID(studentId),
      }).sort({ date: -1 });
    }
    console.log(attendance);
    return res.json(attendance);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;

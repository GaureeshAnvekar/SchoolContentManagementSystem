const mongoose = require("mongoose");

const AttendanceSchema = new mongoose.Schema({
  schoolId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "schools",
  },
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "students",
  },
  date: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: Boolean,
  },
});

module.exports = Attendance = mongoose.model("attendance", AttendanceSchema);

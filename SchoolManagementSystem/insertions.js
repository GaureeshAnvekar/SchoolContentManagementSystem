const connectDB = require("./config/db");

connectDB();
const Attendance = require("./models/Attendance");

attendance = new Attendance({
  schoolId: "5ecec70e8291d203f9a79a8b",
  studentId: "5ed16bfb71dc4204ef3de56b",
  date: Date.now(),
  status: true,
});

attendance.save();

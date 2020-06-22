const connectDB = require("./config/db");

connectDB();
const Attendance = require("./models/Attendance");

attendance = new Attendance({
  schoolId: "5ecec70e8291d203f9a79a8b",
  studentId: "5ed16bfb71dc4204ef3de56b",
  date: new Date(2022, 9, 5),
  status: true,
});

attendance.save();

const connectDB = require("./config/db");

connectDB();
const Attendance = require("./models/Attendance");

func = async () => {
  let isoDateFrom = new Date(2020, 5, 25).toISOString();
  let isoDateTo = new Date(2021, 2, 31).toISOString();

  let attendance = await Attendance.find();
  /*
  let attendance = await Attendance.find({
    date: { $gte: isoDateFrom, $lte: isoDateTo },
  });*/

  console.log(attendance[0]);
};

func();
console.log(new Date("06/03/2020"));

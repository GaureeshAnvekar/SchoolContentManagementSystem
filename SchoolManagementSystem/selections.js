const connectDB = require("./config/db");
const ObjectID = require("mongodb").ObjectID;

connectDB();
const Attendance = require("./models/Attendance");
const Assignments = require("./models/Assignments");

func = async () => {
  let isoDateFrom = new Date(2020, 5, 25).toISOString();
  let isoDateTo = new Date(2021, 2, 31).toISOString();
  /*
  let attendance = await Attendance.find(null, {
    date: 1,
    status: 1,
    _id: 0,
  }).sort({ date: -1 });
  /*
  let attendance = await Attendance.find({
    date: { $gte: isoDateFrom, $lte: isoDateTo },
  });*/

  assignments = await Assignments.find({
    schoolId: new ObjectID("5ecec70e8291d203f9a79a8b"),
    std: 5,
    section: "A",
  });

  console.log(assignments);
};

func();
console.log(new Date("06/03/2020"));

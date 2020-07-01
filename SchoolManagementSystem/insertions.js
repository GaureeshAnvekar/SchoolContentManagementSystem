const connectDB = require("./config/db");

connectDB();
const Attendance = require("./models/Attendance");
const StandardSubject = require("./models/StandardSubject");
const Assignments = require("./models/Assignments");
/*
attendance = new Attendance({
  schoolId: "5ecec70e8291d203f9a79a8b",
  studentId: "5ed16bfb71dc4204ef3de56b",
  date: new Date(2022, 9, 5),
  status: true,
});*/

/*
standardSubject = new StandardSubject({
  schoolId: "5ecec70e8291d203f9a79a8b",
  stdSubs: {
    std: 1,
    sections: ["A", "B"],
    subs: ["Maths", "Science"],
  },
});*/

assignments = new Assignments({
  schoolId: "5ecec70e8291d203f9a79a8b",
  name: "Trigonometry",
  subject: "Math",
  std: 5,
  section: "A",
  brief: "Find x",
  document: "questions.pdf",
  deadline: Date.now(),
});

assignments.save();

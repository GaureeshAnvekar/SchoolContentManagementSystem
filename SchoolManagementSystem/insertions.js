const connectDB = require("./config/db");

connectDB();
const Attendance = require("./models/Attendance");
const StandardSubject = require("./models/StandardSubject");
const Assignments = require("./models/Assignments");
const LibraryIssuedBooks = require("./models/LibraryIssuedBooks");
const ObjectID = require("mongodb").ObjectID;
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

libraryIssuedBooks = new LibraryIssuedBooks({
  schoolId: "5ecec70e8291d203f9a79a8b",
  bookId: "Trigonometry",
  loanDate: new Date(),
  dueDate: new Date(),
  regId: new ObjectID("5ecebb4da5b981f4fc5ebbb1"),
  type: "student",
});

libraryIssuedBooks.save();

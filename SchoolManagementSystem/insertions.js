const connectDB = require("./config/db");

connectDB();
const Attendance = require("./models/Attendance");
const StandardSubject = require("./models/StandardSubject");
const Assignments = require("./models/Assignments");
const LibraryIssuedBooks = require("./models/LibraryIssuedBooks");
const ObjectID = require("mongodb").ObjectID;
const LibraryBooks = require("./models/LibraryBooks");
const Employees = require("./models/Employees");
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

/*
libraryIssuedBooks = new LibraryIssuedBooks({
  schoolId: "5ecec70e8291d203f9a79a8b",
  bookId: "Trigonometry",
  loanDate: new Date(),
  dueDate: new Date(),
  regId: new ObjectID("5ecebb4da5b981f4fc5ebbb1"),
  type: "student",
});
*/
/*
libraryBooks = new LibraryBooks({
  schoolId: "5ecec70e8291d203f9a79a8b",
  bookId: "2",
  title: "The wine of astonishment",
  author: "earl lovelace",
  publisher: "",
  mrp: 50,
  cost: 50,
  yearOfPurchase: 2000,
  isAvailable: true,
  genre: "novels",
}); */
/*
LibraryBooks.insertMany([
  {
    schoolId: "5ecec70e8291d203f9a79a8b",
    bookId: "11",
    title: "The woman who lost her soul",
    author: "bob shacochis",
    publisher: "",
    mrp: 50,
    cost: 50,
    yearOfPurchase: 2000,
    isAvailable: true,
    genre: "fiction",
  },
  {
    schoolId: "5ecec70e8291d203f9a79a8b",
    bookId: "12",
    title: "the changeling",
    author: "victor lavalle",
    publisher: "",
    mrp: 50,
    cost: 50,
    yearOfPurchase: 2000,
    isAvailable: true,
    genre: "fiction",
  },
  {
    schoolId: "5ecec70e8291d203f9a79a8b",
    bookId: "13",
    title: "wonderland",
    author: "stacey d'erasmo",
    publisher: "",
    mrp: 50,
    cost: 50,
    yearOfPurchase: 2000,
    isAvailable: true,
    genre: "fiction",
  },
  {
    schoolId: "5ecec70e8291d203f9a79a8b",
    bookId: "14",
    title: "a day in the life",
    author: "anjum hassan",
    publisher: "",
    mrp: 50,
    cost: 50,
    yearOfPurchase: 2000,
    isAvailable: true,
    genre: "fiction",
  },
  {
    schoolId: "5ecec70e8291d203f9a79a8b",
    bookId: "15",
    title: "polite society",
    author: "mahesh rao",
    publisher: "",
    mrp: 50,
    cost: 50,
    yearOfPurchase: 2000,
    isAvailable: true,
    genre: "fiction",
  },
  {
    schoolId: "5ecec70e8291d203f9a79a8b",
    bookId: "16",
    title: "Two can keep a secret",
    author: "karen mcmanus",
    publisher: "",
    mrp: 50,
    cost: 50,
    yearOfPurchase: 2000,
    isAvailable: true,
    genre: "fiction",
  },
  {
    schoolId: "5ecec70e8291d203f9a79a8b",
    bookId: "17",
    title: "we are not ourselves",
    author: "matthew thomas",
    publisher: "",
    mrp: 50,
    cost: 50,
    yearOfPurchase: 2000,
    isAvailable: true,
    genre: "fiction",
  },
  {
    schoolId: "5ecec70e8291d203f9a79a8b",
    bookId: "18",
    title: "Welcome to bragssville",
    author: "t. geronimo johnson",
    publisher: "",
    mrp: 50,
    cost: 50,
    yearOfPurchase: 2000,
    isAvailable: true,
    genre: "fiction",
  },
  {
    schoolId: "5ecec70e8291d203f9a79a8b",
    bookId: "19",
    title: "There there",
    author: "tommy orange",
    publisher: "",
    mrp: 50,
    cost: 50,
    yearOfPurchase: 2000,
    isAvailable: true,
    genre: "fiction",
  },
]); */

Employees.insertMany([
  {
    schoolId: "5ecec70e8291d203f9a79a8b",
    firstname: "Alex",
    lastname: "Michener",
    gender: "male",
    password: "",
  },
]);

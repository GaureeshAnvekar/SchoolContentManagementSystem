const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");

//Connect DB
connectDB();

const app = express();

//init required middleware
//body-parser
app.use(express.json({ extended: false })); //This is a middleware which took the request and made it possible so that req.body
//can directly be used inside console.log()
const PORT = process.env.PORT || 5000;

app.use(cors());
// School registration router
const schoolRegRouter = require("./routes/api/schools/registration");
app.use("/api/schools/registration", schoolRegRouter);

// Decode jwt router
const decodeJWTRouter = require("./routes/api/decodeJWT");
app.use("/api/decodeJWT", decodeJWTRouter);

// School authentication router (authentication means get request for particular school)
const schoolAuthRouter = require("./routes/api/schools/authentication");
app.use("/api/schools/authentication", schoolAuthRouter);

const schoolInfoRouter = require("./routes/api/schools/schoolInfo");
app.use("/api/schools/schoolInfo", schoolInfoRouter);

// Student registration router
const studentRegRouter = require("./routes/api/students/registration");
app.use("/api/students/registration", studentRegRouter);

// Student authentication router (authentication means get request for particular student)
const studentAuthRouter = require("./routes/api/students/authentication");
app.use("/api/students/authentication", studentAuthRouter);

// All students or specific student for a given school
const getStudentsRouter = require("./routes/api/students/getStudents");
app.use("/api/students/getStudents", getStudentsRouter);

// Delete student from school
const deleteStudentRouter = require("./routes/api/students/delete");
app.use("/api/students/delete", deleteStudentRouter);

// Attendance Status of a student
const attendanceStatusRouter = require("./routes/api/students/attendanceStatus");
app.use("/api/students/attendanceStatus", attendanceStatusRouter);

// Assignments of a student
const assignmentsRouter = require("./routes/api/students/assignments");
app.use("/api/students/assignments", assignmentsRouter);

// Pdfs of assignment for students
app.use(
  "/api/students/pdfs",
  express.static("./routes/api/students/pdfs/test.pdf")
);

// Library authentication of a school
const libraryAuthRouter = require("./routes/api/library/authentication");
app.use("/api/library/authentication", libraryAuthRouter);

// Upload a new book for a school library
const uploadBookRouter = require("./routes/api/library/uploadBook");
app.use("/api/library/uploadBook", uploadBookRouter);

// Delete a book for a school library
const deleteBookRouter = require("./routes/api/library/deleteBook");
app.use("/api/library/deleteBook", deleteBookRouter);

// Issue a book for a school library
const issueBookRouter = require("./routes/api/library/issueBook");
app.use("/api/library/issueBook", issueBookRouter);

//app.get("/", (req, res) => res.send("API running"));

app.listen(PORT, () => console.log(`Server started at ${PORT}`));

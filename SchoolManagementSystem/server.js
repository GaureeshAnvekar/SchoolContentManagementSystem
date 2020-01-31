const express = require("express");
const connectDB = require("./config/db");

//Connect DB
connectDB();

const app = express();

//init required middleware
//body-parser
app.use(express.json({ extended: false })); //This is a middleware which took the request and made it possible so that req.body
//can directly be used inside console.log()
const PORT = process.env.PORT || 5000;

// School registration router
const schoolRegRoute = require("./routes/api/schools/registration");
app.use("/api/schools/registration", schoolRegRoute);

// School authentication router (authentication means get request for particular school)
const schoolAuthRoute = require("./routes/api/schools/authentication");
app.use("/api/schools/authentication", schoolAuthRoute);

// Student registration router
const studentRegRoute = require("./routes/api/students/registration");
app.use("/api/students/registration", studentRegRoute);

// Student authentication router (authentication means get request for particular student)
const studentAuthRoute = require("./routes/api/students/authentication");
app.use("/api/students/authentication", studentAuthRoute);

// All students or specific student for a given school
const getStudentsRoute = require("./routes/api/students/getStudents");
app.use("/api/students/getStudents", getStudentsRoute);

// Delete student from school
const deleteStudentRoute = require("./routes/api/students/delete");
app.use("/api/students/delete", deleteStudentRoute);

//app.get("/", (req, res) => res.send("API running"));

app.listen(PORT, () => console.log(`Server started at ${PORT}`));

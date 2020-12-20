const express = require("express");
const connectDB = require("./config/db");
const path = require("path");
const cors = require("cors");
const fs = require('fs');
const paypal = require("paypal-rest-sdk");
const subdomain = require('express-subdomain');
//paypal config starts
paypal.configure({
  'mode': 'sandbox', //sandbox or live
  'client_id': 'AWBY-oljiTKtxvQ3M0hk8Eb34A6Wp7AGbMhSenJjK98dpu_Q5dptW72QAIjLIfyQrKWr5garGMp1hz8V',
  'client_secret': 'EIjJS6Rpe60DnXaL5ikEPkVMny7wpUXdrCKk94e5JR5E4amuKONf0NGNb-2tlZYyIohmqtudDsRIDDe8'
});
//paypal config ends

//multer code start
const multer = require("multer");

//For transfer of multiple files between users during chat
var storage1 = multer.diskStorage({
  destination: function (req, file, cb) {
  cb(null, './routes/api/uploads/temp/' + req.header("meetingId"));
},
filename: function (req, file, cb) {
  
  cb(null, file.originalname )
}
});
//For school logo
var storage2 = multer.diskStorage({
  destination: function (req, file, cb) {
    //Make dir for the new school using short it's url
    let dir = __dirname + "/routes/api/uploads/school_logos/" + req.body.subdomain;
    if (!fs.existsSync(dir)){
      fs.mkdirSync(dir);
    }

    cb(null, dir);
},
filename: function (req, file, cb) {
  let ext = null;
  if (file.mimetype == "image/png") {
    ext = ".png"
  } else {
    ext = ".jpg"
  }

  cb(null, req.body.subdomain + ext );
}
});
var upload1 = multer({storage: storage1}).array('file');
var upload2 = multer({storage: storage2}).single('logo');
//multer code end

//Connect DB
connectDB();

const app = express();

const server = require("http").Server(app);
const io = require("socket.io")(server, { path: "/api/sockets" });

const { PeerServer } = require("peer");



// react's index.html from build if school exists
/*
app.use(subdomain('joseph', (req, res, next) => {
  console.log("inside");
  //check if school exists in db, if yes give index.html from react's build
  res.sendFile(path.join(__dirname, "/client/build/index.html"));
}));
// */

app.use(subdomain('joseph', express.static(path.join(__dirname, '/client/build'))));


app.get('/', function (req, res) { res.redirect('/home') });




// static assets for react frontend
app.use(express.static(path.join(__dirname, '/client/build')));
//




// globals
global.currentMeetings = new Map();
//init required middleware
//body-parser
app.use(express.json({ extended: false })); //This is a middleware which took the request and made it possible so that req.body
//can directly be used inside console.log()
const PORT = process.env.PORT || 5000;

app.use(cors());

app.set('view engine', 'ejs');

//Landing starts
app.use('/public', express.static(__dirname + '/public'));
app.use('/preview/public', express.static(__dirname + '/public'));






app.use('/home', 
  express.static("./views/landingpages/index.html")
)

app.use('/createAccount', 
  express.static("./views/landingpages/createAccount.html"));



app.get('/preview', function(req, res) {
  let template = req.query.template;
  res.render('previewpages/' + template);
});
//Landing ends

// School registration router
const schoolRegRouter = require("./routes/api/schools/registration");
app.use("/api/schools/registration", function(req, res, next) {
  upload2(req, res, function (err) {
    if (err instanceof multer.MulterError) {
        return res.status(500).json(err)
    } else if (err) {
        return res.status(500).json(err)
    }
    next();
  })
  },
  schoolRegRouter
  );


// Check if url exists
const checkUrlRouter = require("./routes/api/schools/checkUrl");
app.use("/api/schools/checkUrl", checkUrlRouter);

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

// Employee registration router
const employeeRegRouter = require("./routes/api/employees/registration");
app.use("/api/employees/registration", employeeRegRouter);

// Student authentication router (authentication means get request for particular student)
const studentAuthRouter = require("./routes/api/students/authentication");
app.use("/api/students/authentication", studentAuthRouter);

// Employee authentication router (authentication means get request for particular employee)
const employeeAuthRouter = require("./routes/api/employees/authentication");
app.use("/api/employees/authentication", employeeAuthRouter);

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

//save books to notify of a student from a school
const booksToNotifyRouter = require("./routes/api/students/booksToNotify");
app.use("/api/students/saveBooksToNotify", booksToNotifyRouter);

//get books to notify of a student
const getBooksToNotifyList = require("./routes/api/students/getBooksToNotifyList");
app.use("/api/students/getBooksToNotifyList", getBooksToNotifyList);

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

// Calculate due for a book for a school library
const calculateDueRouter = require("./routes/api/library/calculateDue");
app.use("/api/library/calculateDue", calculateDueRouter);

// Receive issued book back from student/staff for library
const receiveBookRouter = require("./routes/api/library/receiveBook");
app.use("/api/library/receiveBook", receiveBookRouter);

// Search books of a library from school
const searchBooksRouter = require("./routes/api/library/searchBooks");
app.use("/api/library/searchBooks", searchBooksRouter);

// Count of total books of a library from school
const totalBooksCountRouter = require("./routes/api/library/totalBooksCount");
app.use("/api/library/totalBooksCount", totalBooksCountRouter);

// Pagination for virtual ibrary from school
const paginationLibraryRouter = require("./routes/api/library/pagination");
app.use("/api/library/pagination", paginationLibraryRouter);

// Search book borrrowers from school
const searchBorrowersRouter = require("./routes/api/library/searchBorrowers");
app.use("/api/library/searchBorrowers", searchBorrowersRouter);

// Schedule online lecture
const scheduleLectureRouter = require("./routes/api/onlineLecture/scheduleLecture");
app.use("/api/onlineLecture/scheduleLecture", scheduleLectureRouter);

// Get all scheduled lectures of an employee
const getAllScheduledLecturesRouter = require("./routes/api/onlineLecture/getAllScheduledLectures");
app.use(
  "/api/onlineLecture/getAllScheduledLectures",
  getAllScheduledLecturesRouter
);

// Cancel a scheduled lecture of an employee
const cancelScheduledLectureRouter = require("./routes/api/onlineLecture/cancelScheduledLecture");
app.use(
  "/api/onlineLecture/cancelScheduledLecture",
  cancelScheduledLectureRouter
);

// Get all scheduled lectures of student
const getStudentsLecturesRouter = require("./routes/api/onlineLecture/getStudentsLectures");
app.use("/api/onlineLecture/getStudentsLectures", getStudentsLecturesRouter);



// Send the uploaded file during online lecture chat
app.use("/api/uploads/temp", (req, res) => {
  let meetingId = req.query.meetingId;
  let fileName = req.query.fileName;

  
  res.setHeader('Content-Disposition', 'attachment; filename=' + fileName);
  res.sendFile(__dirname + "/routes/api/uploads/temp/"  + meetingId + "/" + fileName);
  //res.end();
});


// Files uploads during online lecture
app.post('/api/uploads',function(req, res) {
  
  upload1(req, res, function (err) {
         if (err instanceof multer.MulterError) {
             return res.status(500).json(err)
         } else if (err) {
             return res.status(500).json(err)
         }
    return res.status(200).send(req.file)

  })

});




// Paypal payment handler
const payments = require("./routes/api/paypal/payments");
app.post('/payment', function(req, res) {
  payments(paypal, req, res);
});


// Socket Connection Code Start
const socketConnection = require("./routes/api/sockets/socketConnection");
socketConnection(io);
// Socket Connection Code End

//app.get("/", (req, res) => res.send("API running"));

server.listen(PORT, () => console.log(`Server started at ${PORT}`));

const peerServer = PeerServer({ port: 9000, path: "/peerJS" }); // This server handles passing of session object, getting public address from STUN server etc
//app.listen(PORT, () => console.log(`Server started at ${PORT}`));

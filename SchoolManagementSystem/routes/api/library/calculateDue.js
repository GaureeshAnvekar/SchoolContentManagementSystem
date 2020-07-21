const express = require("express");
const router = express.Router();
const ObjectID = require("mongodb").ObjectID;
const authVerify = require("../../../customMiddleware/authVerify");
const moment = require("moment");

const LibraryIssuedBooks = require("../../../models/LibraryIssuedBooks");

// @route     POST api/library/calculateDue
// @desc      This happens when receiving book back from student/staff. Due is calculated if delayed.
// @access    Public
router.post("/", authVerify, async (req, res) => {
  try {
    const { bookId, due } = req.body;

    let schoolId = res.locals.decoded.schoolId;

    let book = await LibraryIssuedBooks.findOne({
      schoolId: new ObjectID(schoolId),
      bookId: bookId,
    });

    if (!book) {
      return res
        .status(400)
        .json({ errors: [{ msg: "Book ID not available" }] });
    }

    let dueDate = new Date(book.dueDate);
    let today = new Date();

    let start = moment(today);
    let end = moment(dueDate);
    let bookDue = 0;
    let diff = start.diff(end, "days");
    console.log(diff);
    if (diff > 0) {
      bookDue = diff * due;
    }

    return res.json({ bookDue });
  } catch (err) {
    console.error("Error here " + err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;

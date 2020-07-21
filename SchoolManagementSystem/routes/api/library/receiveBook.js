const express = require("express");
const router = express.Router();
const ObjectID = require("mongodb").ObjectID;
const authVerify = require("../../../customMiddleware/authVerify");
const LibraryIssuedBooks = require("../../../models/LibraryIssuedBooks");
const LibraryReceivedBooks = require("../../../models/LibraryReceivedBooks");

// @route     POST api/library/receiveBook
// @desc      This happens when receiving book back from student/staff.
// @access    Public
router.post("/", authVerify, async (req, res) => {
  try {
    const { bookId, regId, returnDate, currBookDue } = req.body;

    let schoolId = res.locals.decoded.schoolId;

    let book = await LibraryIssuedBooks.deleteOne({
      schoolId: new ObjectID(schoolId),
      bookId: bookId,
    });

    let loanDate = book.loanDate;
    let dueDate = book.dueDate;

    let receiveBook = new LibraryReceivedBooks({
      schoolId: new ObjectID(schoolId),
      bookId: bookId,
      regId: regId,
      duePaid: currBookDue,
      loanDate: loanDate,
      dueDate: dueDate,
      returnDate: returnDate,
    });

    await receiveBook.save();

    return res.sendStatus(200);
  } catch (err) {
    console.error("Error here " + err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;

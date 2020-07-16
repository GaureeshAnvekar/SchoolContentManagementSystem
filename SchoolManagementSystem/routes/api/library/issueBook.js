const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator/check");
const ObjectID = require("mongodb").ObjectID;
const authVerify = require("../../../customMiddleware/authVerify");

const LibraryIssuedBooks = require("../../../models/LibraryIssuedBooks");

// @route     POST api/library/uploadBook
// @desc      Upload a new book into library
// @access    Public
router.post(
  "/",
  authVerify,
  [
    check("bookId", "Book ID is required").not().isEmpty(),
    check("loanDate", "Loan date is required").not().isEmpty(),
    check("dueDays", "Due days is required").not().isEmpty(),
    check("regId", "Reg ID is required").not().isEmpty(),
    check("type", "Type is required").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { bookId, loanDate, dueDate, regId, type } = req.body;

      let schoolId = res.locals.decoded.schoolId;

      libraryIssuedBooks = new LibraryIssuedBooks({
        schoolId: new ObjectID(schoolId),
        bookId: bookId,
        loanDate: loanDate,
        dueDate: dueDate,
        regId: regId,
        type: type,
      });

      await libraryIssuedBooks.save();

      return res.sendStatus(200);
    } catch (err) {
      console.error("Error here " + err.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;

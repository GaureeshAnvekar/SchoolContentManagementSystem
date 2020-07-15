const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator/check");
const authVerify = require("../../../customMiddleware/authVerify");

const LibraryBooks = require("../../../models/LibraryBooks");

// @route     POST api/library/uploadBook
// @desc      Upload a new book into library
// @access    Public
router.post(
  "/",
  authVerify,
  [check("bookId", "Book ID is required").not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { bookId } = req.body;

      let schoolId = res.locals.decoded.schoolId;
      let bookFound = false;
      await LibraryBooks.deleteOne(
        {
          schoolId: schoolId,
          bookId: bookId,
        },
        function (err, result) {
          console.log(result.deletedCount);
          if (result.deletedCount > 0) {
            bookFound = true;
          }
        }
      );

      if (bookFound) {
        return res.sendStatus(200);
      } else {
        return res.status(400).json({ errors: ["Book not found"] });
      }
    } catch (err) {
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;

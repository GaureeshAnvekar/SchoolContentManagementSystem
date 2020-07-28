/* To get all library books of a school
 * JWT is verified.
 */

const LibraryIssuedBooks = require("../../../models/LibraryIssuedBooks");
const Students = require("../../../models/Students");
const express = require("express");
const router = express.Router();
const authVerify = require("../../../customMiddleware/authVerify");
const ObjectID = require("mongodb").ObjectID;

// @route    GET api/library/searchBooks
// @desc     To get all books of library from school
// @access   Public (Used by librarian)
router.get("/", authVerify, async (req, res) => {
  try {
    let schoolId = res.locals.decoded.schoolId;

    libraryIssuedBooks = await LibraryIssuedBooks.find(
      {
        schoolId: new ObjectID(schoolId),
      },
      {
        _id: 0,
        schoolId: 0,
      }
    ).populate("regId", Students);

    console.log(libraryIssuedBooks);
    return res.json(libraryIssuedBooks);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;

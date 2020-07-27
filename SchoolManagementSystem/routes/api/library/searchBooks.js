/* To get all library books of a school
 * JWT is verified.
 */

const LibraryBooks = require("../../../models/LibraryBooks");
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

    libraryBooks = await LibraryBooks.find(
      {
        schoolId: new ObjectID(schoolId),
      },
      {
        _id: 0,
        schoolId: 0,
      }
    );
    console.log(libraryBooks);
    return res.json(libraryBooks);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;

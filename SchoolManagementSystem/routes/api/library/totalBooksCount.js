/* To get total count of books in library
 * JWT is verified.
 */

const LibraryBooks = require("../../../models/LibraryBooks");
const express = require("express");
const router = express.Router();
const authVerify = require("../../../customMiddleware/authVerify");
const ObjectID = require("mongodb").ObjectID;

// @route    GET api/library/totalBooksCount
// @desc     To get total count of all books of library from school
// @access   Public
router.get("/", authVerify, async (req, res) => {
  try {
    let schoolId = res.locals.decoded.schoolId;
    let genre = req.query.genre;

    totalBooks = await LibraryBooks.countDocuments({
      schoolId: new ObjectID(schoolId),
      genre: genre,
    });

    return res.json(totalBooks);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;

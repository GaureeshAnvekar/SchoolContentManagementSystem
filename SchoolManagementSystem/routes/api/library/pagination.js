/* To get all library books for virtual library of a school
 * JWT is verified.
 */
const LibraryBooks = require("../../../models/LibraryBooks");
const express = require("express");
const router = express.Router();
const authVerify = require("../../../customMiddleware/authVerify");
const ObjectID = require("mongodb").ObjectID;

// @route    GET api/library/pagination
// @desc     To get all books of library from school
// @access   Public
router.get("/", authVerify, async (req, res) => {
  try {
    let schoolId = res.locals.decoded.schoolId;

    const genre = req.query.genre;
    const page = parseInt(req.query.page);
    const searchQuery = req.query.query;
    const limit = 5;
    const startIndex = (page - 1) * limit;

    if (!searchQuery) {
      libraryBooks = await LibraryBooks.find(
        {
          schoolId: new ObjectID(schoolId),
          genre: genre,
        },
        {
          _id: 0,
          bookId: 1,
          title: 1,
          author: 1,
          isAvailable: 1,
          imageLink: 1,
          previewLink: 1,
          writeRevLink: 1,
          averageRating: 1,
        }
      )
        .skip(startIndex)
        .limit(limit)
        .exec();

      return res.json(libraryBooks);
    } else if (searchQuery.length <= 2) {
      return res.json([]);
    } else {
      libraryBooksByTitle = await LibraryBooks.find(
        {
          schoolId: new ObjectID(schoolId),
          title: { $regex: new RegExp(searchQuery, "i") },
        },
        {
          _id: 0,
          bookId: 1,
          title: 1,
          author: 1,
          isAvailable: 1,
          imageLink: 1,
          previewLink: 1,
          writeRevLink: 1,
          averageRating: 1,
        }
      ).exec();

      if (libraryBooksByTitle.length == 0) {
        libraryBooksByAuthor = await LibraryBooks.find(
          {
            schoolId: new ObjectID(schoolId),
            author: { $regex: new RegExp(searchQuery, "i") },
          },
          {
            _id: 0,
            bookId: 1,
            title: 1,
            author: 1,
            isAvailable: 1,
            imageLink: 1,
            previewLink: 1,
            writeRevLink: 1,
            averageRating: 1,
          }
        )
          .skip(startIndex)
          .limit(limit)
          .exec();

        return res.json(libraryBooksByAuthor);
      } else {
        return res.json(libraryBooksByTitle);
      }
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;

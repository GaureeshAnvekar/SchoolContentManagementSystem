const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator/check");
const ObjectID = require("mongodb").ObjectID;
const authVerify = require("../../../customMiddleware/authVerify");
const getBookInfoAPI = require("../../../utils/externalAPI");

const LibraryBooks = require("../../../models/LibraryBooks");

// @route     POST api/library/uploadBook
// @desc      Upload a new book into library
// @access    Public
router.post(
  "/",
  authVerify,
  [
    check("bookId", "Book ID is required").not().isEmpty(),
    check("title", "Title is required").not().isEmpty(),
    check("author", "Author is required").not().isEmpty(),
    check("publisher", "Publisher is required").not().isEmpty(),
    check("genre", "Genre is required").not().isEmpty(),
    check("mrp", "MRP is required").not().isEmpty(),
    check("cost", "Cost is required").not().isEmpty(),
    check("yearOfPurchase", "Year of Purchase is required").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const {
        bookId,
        title,
        author,
        publisher,
        genre,
        mrp,
        cost,
        yearOfPurchase,
      } = req.body;

      let schoolId = res.locals.decoded.schoolId;

      // See if book Id exists
      let book = await LibraryBooks.findOne({ schoolId, bookId });

      if (book) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Book Id already exists" }] });
      }

      //Get more info about the book from google books api
      const data = await getBookInfoAPI({ title: title, author: author });
      console.log(data);
      libraryBooks = new LibraryBooks({
        schoolId: new ObjectID(schoolId),
        bookId: bookId,
        title: data ? data.title : title,
        author: data ? data.authors : [author],
        publisher: publisher,
        genre: genre,
        mrp: mrp,
        cost: cost,
        yearOfPurchase: yearOfPurchase,
        averageRating: data ? data.averageRating : null,
        imageLink: data ? data.imageLinks.thumbnail : null,
        previewLink: data ? data.previewLink : null,
        writeRevLink: data ? data.infoLink : null,
        isAvailable: true,
      });

      await libraryBooks.save();

      return res.sendStatus(200);
    } catch (err) {
      console.error("Error here " + err.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;

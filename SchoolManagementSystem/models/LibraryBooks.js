const mongoose = require("mongoose");

const LibraryBooksSchema = new mongoose.Schema({
  schoolId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "schools",
  },
  bookId: {
    type: String,
  },
  title: {
    type: String,
  },
  author: {
    type: Array,
  },
  publisher: {
    type: String,
  },
  genre: {
    type: String,
  },
  mrp: {
    type: Number,
  },
  cost: {
    type: Number,
  },
  yearOfPurchase: {
    type: Number,
  },
  isAvailable: {
    type: Boolean,
  },
  averageRating: {
    type: Number,
  },
  imageLink: {
    type: String,
  },
  previewLink: {
    type: String,
  },
  writeRevLink: {
    type: String,
  },
});

module.exports = LibraryBooks = mongoose.model(
  "libraryBooks",
  LibraryBooksSchema
);

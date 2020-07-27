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
    type: String,
  },
  publisher: {
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
});

module.exports = LibraryBooks = mongoose.model(
  "libraryBooks",
  LibraryBooksSchema
);

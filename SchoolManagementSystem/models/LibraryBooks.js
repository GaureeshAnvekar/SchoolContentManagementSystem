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
  MRP: {
    type: Number,
  },
  Cost: {
    type: Number,
  },
  YearOfPurchase: {
    type: Number,
  },
});

module.exports = LibraryBooks = mongoose.model(
  "libraryBooks",
  LibraryBooksSchema
);

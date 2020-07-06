const mongoose = require("mongoose");

const LibraryIssuedBooksSchema = new mongoose.Schema({
  schoolId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "schools",
  },
  regId: {
    type: Number,
  },
  bookId: {
    type: Number,
  },
  loanDate: {
    type: Date,
  },
  dueDate: {
    type: Date,
  },
  type: {
    type: String,
  },
});

module.exports = LibraryIssuedBooks = mongoose.model(
  "libraryIssuedBooks",
  LibraryIssuedBooksSchema
);

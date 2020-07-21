const mongoose = require("mongoose");

const LibraryReceivedBooksSchema = new mongoose.Schema({
  schoolId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "schools",
  },
  regId: {
    type: String,
  },
  bookId: {
    type: String,
  },
  loanDate: {
    type: Date,
  },
  dueDate: {
    type: Date,
  },
  returnDate: {
    type: Date,
  },
  duePaid: {
    type: Number,
  },
});

module.exports = LibraryReceivedBooks = mongoose.model(
  "libraryReceivedBooks",
  LibraryReceivedBooksSchema
);

const mongoose = require("mongoose");

const StudentsSchema = new mongoose.Schema({
  school: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "schools"
  },
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  rollno: {
    type: Number,
    required: true
  },
  classgrade: {
    type: Number,
    required: true
  },
  section: {
    type: String,
    required: true
  },
  dob: {
    type: Date,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  githubusername: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Students = mongoose.model("students", StudentsSchema);

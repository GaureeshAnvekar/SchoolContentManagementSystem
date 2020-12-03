const mongoose = require("mongoose");

const EmployeesSchema = new mongoose.Schema({
  school: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "schools",
  },
  username: {
    type: String,
    required: true,
  },
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  booksToNotify: {
    type: Array,
    required: false,
  },
});

module.exports = Employees = mongoose.model("employees", EmployeesSchema);

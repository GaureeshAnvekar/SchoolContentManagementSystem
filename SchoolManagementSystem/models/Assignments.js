const mongoose = require("mongoose");

const AssignmentsSchema = new mongoose.Schema({
  schoolId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "schools",
  },
  name: {
    type: String,
  },
  std: {
    type: Number,
  },
  section: {
    type: String,
  },
  subject: {
    type: String,
  },
  brief: {
    type: String,
  },
  document: {
    type: String,
  },
  deadline: {
    type: Date,
  },
});

module.exports = Assignments = mongoose.model("assignments", AssignmentsSchema);

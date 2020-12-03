const mongoose = require("mongoose");

const OnlineLectureSchedulesSchema = new mongoose.Schema({
  schoolId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "schools",
  },
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "employees",
  },
  topic: {
    type: String,
  },
  class: {
    type: Number,
  },
  section: {
    type: String,
  },
  scheduleDateTimeStart: {
    type: Date,
    required: true,
  },
  scheduleDateTimeEnd: {
    type: Date,
    required: true,
  },
});

module.exports = OnlineLectureSchedules = mongoose.model(
  "onlineLectureSchedulesSchema",
  OnlineLectureSchedulesSchema
);

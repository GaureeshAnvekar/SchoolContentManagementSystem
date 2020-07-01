const mongoose = require("mongoose");

const StandardSubjectSchema = new mongoose.Schema({
  schoolId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "schools",
  },
  stdSubs: {
    std: Number,
    sections: [String],
    subs: [String],
  },
});

module.exports = StandardSubject = mongoose.model(
  "StandardSubject",
  StandardSubjectSchema
);

const mongoose = require("mongoose");

const SchoolsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  subdomain: {
    type: String,
    required: true
  },
  adminname: {
    type: String,
    required: true
  },
  adminpassword: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  contact: {
    type: Number,
    required: true
  },
  logo: {
    data: Buffer,
    contentType: String
  },
  template: {
    type: Number
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Schools = mongoose.model("schools", SchoolsSchema);

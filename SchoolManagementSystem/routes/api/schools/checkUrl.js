const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const router = express.Router();
const { check, validationResult } = require("express-validator/check");
const { body } = require("express-validator");
const multer = require("multer");
const upload = multer({dest: __dirname + '/uploads/images'});

const Schools = require("../../../models/Schools");

// @route     GET api/schools/checkUrl
// @desc      check if url exists
// @access    Public
router.get(
  "/",
  async (req, res) => {

    try {
      let url = req.query.url;
      
      let school = await Schools.findOne({ subdomain:url });
      // console.log("admin name " + adminPassword);
      if (school) {
        return res
          .status(400)
          .json({ errors: [{ msg: "School already exists" }] });
      }
      res.status(200).send();
    } catch (err) {
      console.error("Error here " + err.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;

const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const router = express.Router();
const { check, validationResult } = require("express-validator/check");
const { body } = require("express-validator");

const Schools = require("../../../models/Schools");

// @route     POST api/schools/registration
// @desc      Registering a school
// @access    Public
router.post(
  "/",
  [
    check("schoolName", "School name is required")
      .not()
      .isEmpty(),
    check("subdomain", "Short school name is required")
      .not()
      .isEmpty(),
    check("adminName", "Admin name is required")
      .not()
      .isEmpty(),
    check(
      "adminPassword1",
      "Please enter an admin password with 6 or more characters"
    ).isLength({ min: 6 }),
    check("address", "Please enter the school address")
      .not()
      .isEmpty(),
    check("contact", "Please enter school's contact number")
      .not()
      .isEmpty()
      .isNumeric(),
    check("template", "Please select a template")
      .not()
      .isEmpty(),

    body("adminPassword2").custom((value, { req }) => {
      if (value != req.body.adminPassword1) {
        throw new Error("Passwords do not match");
      }
      return true;
    })
  ],
  async (req, res) => {
    console.log(req.body.adminName);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // See if school exists
      const {
        schoolName,
        subdomain,
        adminName,
        adminPassword1,
        adminPassword2,
        address,
        contact,
        template
      } = req.body;
      console.log("this " + adminPassword1);
      let school = await Schools.findOne({ schoolName });
      // console.log("admin name " + adminPassword);
      if (school) {
        return res
          .status(400)
          .json({ errors: [{ msg: "School already exists" }] });
      }

      school = await Schools.findOne({ subdomain });
      if (school) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Short name already exists" }] });
      }

      school = new Schools({
        name: schoolName,
        subdomain: subdomain,
        adminpassword: adminPassword1,
        adminname: adminName,
        address: address,
        contact: contact,
        template: template
      });

      // Encrypt password using bcrypt
      const salt = await bcrypt.genSalt(10);
      school.adminpassword = await bcrypt.hash(adminPassword1, salt);

      await school.save();

      // Just return the subdomain, so the new school page will be opened in new tab
      const payload = {
        school: { subdomain: subdomain }
      };

      return res.json(payload);
    } catch (err) {
      console.error("Error here " + err.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;

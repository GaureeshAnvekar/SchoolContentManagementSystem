const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const router = express.Router();
const { check, validationResult } = require("express-validator/check");

const Schools = require("../../../models/Schools");

// @route     POST api/schools/registration
// @desc      Registering a school
// @access    Public
router.post(
  "/",
  [
    check("name", "School name is required")
      .not()
      .isEmpty(),
    check(
      "password",
      "Please enter a school password with 6 or more characters"
    ).isLength({ min: 6 }),
    check("adminName", "Admin name is required")
      .not()
      .isEmpty(),
    check(
      "adminPassword",
      "Please enter an admin password with 6 or more characters"
    ).isLength({ min: 6 }),
    check("address", "Please enter the school address")
      .not()
      .isEmpty(),
    check("contact", "Please enter school's contact number")
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    }

    try {
      // See if school exists
      const {
        name,
        password,
        adminName,
        adminPassword,
        address,
        contact
      } = req.body;

      let school = await Schools.findOne({ name });
      // console.log("admin name " + adminPassword);
      if (school) {
        return res
          .status(400)
          .json({ errors: [{ msg: "School already exists" }] });
      }

      school = new Schools({
        name: name,
        password: password,
        adminname: adminName,
        adminpassword: adminPassword,
        address: address,
        contact: contact
      });

      // Encrypt password using bcrypt
      const salt = await bcrypt.genSalt(10);
      school.password = await bcrypt.hash(password, salt);
      school.adminpassword = await bcrypt.hash(adminPassword, salt);

      await school.save();

      // Return jsonwebtoken
      const payload = {
        school: { id: school.id, adminName: school.adminname }
      };

      jwt.sign(
        payload,
        config.get("jwtAdminPrivateKey"),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;

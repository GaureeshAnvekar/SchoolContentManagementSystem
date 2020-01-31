/* This authentication, i.e. GET request to login a student will be used by the actual student.
 * The login credentials will be given by the school to the students.
 * During the first login of a student from a given school, jwt is not sent from the client. So a post request is used.
 * IF jwt already present with client(student), use a get request.
 */

const jwt = require("jsonwebtoken");
const config = require("config");
const bcrypt = require("bcryptjs");
const Students = require("../../../models/Students");
const Schools = require("../../../models/Schools");
const express = require("express");
const router = express.Router();
const authVerify = require("../../../customMiddleware/authVerify");
const { check, validationResult } = require("express-validator/check");

// @route     GET api/students/authentication
// @desc      If jwt present on client side (student) then use this route to verify jwt. No data coming from request body.
// @access    Public (Also called protected route as verification is done)
// 2 callbacks used
router.get("/", authVerify, async (req, res) => {
  try {
    // const student = await Students.findOne({
    //  school: req.schoolId
    // }).populate("schools", ["name"]);
    res.json("Student verified");
    //if (!student) {
    //  return res
    //  .status(400)
    //.json({ msg: "There is no student with this name" });
    //}

    //return res.json(profile);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error");
  }
});

// @route    POST api/students/authentication
// @desc     Used when jwt is not present with client(student). Will check credentials, and in turn send a jwt
// @access   Public (Used by student)
router.post(
  "/",
  [
    check("name", "Student name is required")
      .not()
      .isEmpty(),
    check("password", "Password is required").exists()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // See if school exists
      const { name, password } = req.body;
      let student = await Students.findOne({ firstname: name });

      if (!student) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid credentials" }] });
      }

      // If student name is matched, now check password
      const isMatch = await bcrypt.compare(password, student.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid credentials" }] });
      }

      // Details to create jwt. Separate private key is used for student login jwt.
      const payload = { student: { id: student.id, name: student.name } };

      jwt.sign(
        payload,
        config.get("jwtStudentPrivateKey"),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          return res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;

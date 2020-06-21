/* To get attendance status of a student from a school.
 * JWT is verified.
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
const ObjectID = require("mongodb").ObjectID;

// @route    POST api/students/attendanceStatus
// @desc     To get student's attendance status
// @access   Public (Used by student)
router.post(
  "/",
  [
    check("type", "Select one of the attendance options").not().isEmpty(),
    check("month", "Select a month").not().isEmpty(),
    check("year", "Select a year").not().isEmpty(),
    check("startDate", "Select a start date").not().isEmpty(),
    check("endDate", "Select an end date").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // See if school exists
      const { schoolId, username, password, loginType } = req.body;
      let student = await Students.findOne({
        school: new ObjectID(schoolId),
        username: username,
      });
      console.log(schoolId + " " + username + " " + password);
      if (!student) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid credentials" }] });
      }
      console.log(schoolId + " " + username + " " + password);
      // If student name is matched, now check password
      const isMatch = await bcrypt.compare(password, student.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid credentials" }] });
      }

      // Details to create jwt. Separate private key is used for student login jwt.
      const jwtPayload = {
        userId: student.id,
        userName: username,
        schoolId: schoolId,
        loginType: loginType,
      };

      jwt.sign(
        jwtPayload,
        config.get("jwtStudentPrivateKey"),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          const payload = {
            jwt: token,
            userName: username,
            firstName: student.firstname,
            lastName: student.lastname,
            rollNo: student.rollno,
            classGrade: student.classgrade,
            section: student.section,
            dob: student.dob,
            bloodGroup: student.bloodgroup,
            email: student.email,
            loginType: loginType,
          };

          return res.json(payload);
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;

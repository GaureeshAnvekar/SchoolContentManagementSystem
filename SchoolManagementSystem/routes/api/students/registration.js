const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const router = express.Router();
const { check, validationResult } = require("express-validator/check");
const authVerify = require("../../../customMiddleware/authVerify");
const ObjectID = require("mongodb").ObjectID;
const Schools = require("../../../models/Schools");
const Students = require("../../../models/Students");

// @route     POST api/students/registration
// @desc      Registering a student (create or update). Will be used by the schools to register students. So jwt verification
//            is done on admin's jwt.
// @access    Public
router.post(
  "/",
  [
    authVerify,
    [
      check("firstName", "Student's first name is required").not().isEmpty(),
      check("lastName", "Student's last name is required").not().isEmpty(),
      check(
        "password",
        "Student's password is required with min 6 characters"
      ).isLength({ min: 6 }),
      check("rollNo", "Student's roll no is required").not().isEmpty(),
      check("classGrade", "Student's class grade is required").not().isEmpty(),
      check("section", "Student's section is required").not().isEmpty(),
      check("dob", "Student's date of birth is required").not().isEmpty(),
      check("bloodGroup", "Student's blood group is required").not().isEmpty(),
      check("email", "Student's/Parent's email id is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(404).json({ errors: errors.array() });
    }

    try {
      // See if a student exists with roll no (not sure)
      const {
        schoolId,
        firstName,
        lastName,
        password,
        rollNo,
        classGrade,
        section,
        dob,
        bloodGroup,
        email,
      } = req.body;

      // Here school id should also be used to find a student. This info can be present as sub-domain
      let student = await Students.findOne({
        school: new ObjectID(schoolId),
        classgrade: classGrade,
        section: section,
        rollno: rollNo,
      });

      // dob is DD-MM-YYYY, so dateArrr will contain DD, MM, YYYY
      const dateArr = String(dob).split("-");

      if (student) {
        // Use a property from body object to check if update is required
        if (req.body.update == "true") {
          // update
          newData = {
            username: firstName + lastName,
            firstname: firstName,
            lastname: lastName,
            password: password,
            rollno: rollNo,
            classgrade: classGrade,
            section: section,
            dob: new Date(dateArr[2], dateArr[1], dateArr[0]),
            bloodgroup: bloodGroup,
            email: email,
          };
          student = await Students.findOneAndUpdate(
            {
              school: new ObjectID(schoolId),
              classgrade: classGrade,
              section: section,
              rollno: rollNo,
            },
            { $set: newData },
            { new: true }
          );
          // Encrypt password using bcrypt
          const salt = await bcrypt.genSalt(10);
          student.password = await bcrypt.hash(password, salt);

          student.save();

          console.log("Student updated");
          return res.json(student);
        } else {
          return res
            .status(400)
            .json({ errors: [{ msg: "Student already exists" }] });
        }
      }

      student = new Students({
        school: schoolId,
        username: firstName + lastName,
        firstname: firstName,
        lastname: lastName,
        password: password,
        rollno: rollNo,
        classgrade: classGrade,
        section,
        dob: new Date(dateArr[2], dateArr[1], dateArr[0]),
        bloodgroup: bloodGroup,
        email,
      });

      // Also need to enter the school id for this student
      // const schoolId = Schools.findOne({ name: req.body.schoolName});
      // Now enter this school id as reference for the current student. Only reference will be used. So to get complete school info, use populate
      // student.school = schoolId;

      // Encrypt password using bcrypt
      const salt = await bcrypt.genSalt(10);
      student.password = await bcrypt.hash(password, salt);

      await student.save();
      res.json("Student registered by admin");
      // No need to create jwt as student creation is done by school admin.
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;

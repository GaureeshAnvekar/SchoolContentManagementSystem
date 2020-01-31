/* Get all students from a particular school, or one student from that school
 */

const express = require("express");
const router = express.Router();
const config = require("config");
const authVerify = require("../../../customMiddleware/authVerify");
const Students = require("../../../models/Students");

// @route     POST api/students/getStudents
// @desc      Get all students from a specific school. So jwt verification
//            is done on admin's jwt.
// @access    Public
router.get("/", authVerify, async (req, res) => {
  //const schoolId = req.body.schoolId;

  // const student = Students.findOne({ }) Find by using school id or name

  try {
    const allStudents = await Students.find(); // temporary without school id
    return res.json(allStudents);
  } catch (err) {
    console.error(err.message);
    res.json("Error");
  }
});

// @route     POST api/students/getStudents
// @desc      Get a student from a specific school. So jwt verification
//            is done on admin's jwt.
// @access    Public
router.get("/:studentName", authVerify, async (req, res) => {
  //const schoolId = req.body.schoolId;

  // const student = Students.findOne({ }) Find by using school id or name

  try {
    const student = await Students.find({ firstname: req.params.studentName }); // temporary without school id
    return res.json(student);
  } catch (err) {
    console.error(err.message);
    res.json("Error");
  }
});

module.exports = router;

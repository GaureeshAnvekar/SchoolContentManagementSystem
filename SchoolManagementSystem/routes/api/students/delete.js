/* Delete a student from particular school id
 */

const express = require("express");
const router = express.Router();
const config = require("config");
const authVerify = require("../../../customMiddleware/authVerify");
const Students = require("../../../models/Students");

// @route     POST api/students/delete
// @desc      Delete a student from a specific school. So jwt verification
//            is done on admin's jwt.
// @access    Public
router.delete("/:studentName", authVerify, async (req, res) => {
  //const schoolId = req.body.schoolId;

  // const student = Students.findOne({ }) Find by using school id or name

  try {
    await Students.findOneAndRemove({ firstname: req.params.studentName }); // temporary without school id
    return res.json("deleted");
  } catch (err) {
    console.error(err.message);
    res.json("Error");
  }
});

module.exports = router;

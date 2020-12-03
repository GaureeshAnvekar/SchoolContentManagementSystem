/* To get assignments of a student from a school.
 * JWT is verified.
 */

const Assignments = require("../../../models/Assignments");
const express = require("express");
const router = express.Router();
const authVerify = require("../../../customMiddleware/authVerify");
const ObjectID = require("mongodb").ObjectID;

// @route    POST api/students/attendanceStatus
// @desc     To get student's attendance status
// @access   Public (Used by student)
router.post("/", authVerify, async (req, res) => {
  const { std, section } = req.body;

  try {
    let schoolId = res.locals.decoded.schoolId;

    assignments = await Assignments.find(
      {
        schoolId: new ObjectID(schoolId),
        std: std,
        section: section,
      },
      {
        subject: 1,
        name: 1,
        brief: 1,
        document: 1,
        deadline: 1,
      }
    );
   

    return res.json(assignments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;

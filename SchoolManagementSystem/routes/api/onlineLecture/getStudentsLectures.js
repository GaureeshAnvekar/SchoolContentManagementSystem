/* This post request is used by student to get all his/her schedule lectures */

const OnlineLectureSchedules = require("../../../models/OnlineLectureSchedules");
const Employees = require("../../../models/Employees");
const express = require("express");
const router = express.Router();
const authVerify = require("../../../customMiddleware/authVerify");
const ObjectID = require("mongodb").ObjectID;

// @route    POST api/onlineLecture/getStudentsLectures
// @access   Public (Used by student)
router.post("/", authVerify, async (req, res) => {
  const { std, section } = req.body;

  try {
    let schedules = await OnlineLectureSchedules.find(
      {
        schoolId: new ObjectID(res.locals.decoded.schoolId),
        class: std,
        section: section,
      },
      {
        _id: 1,
        scheduleDateTimeStart: 1,
        scheduleDateTimeEnd: 1,
        topic: 1,
        employeeId: 1,
      }
    ).populate("employeeId", { _id: 0, firstname: 1, lastname: 1 });

    return res.json(schedules);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;

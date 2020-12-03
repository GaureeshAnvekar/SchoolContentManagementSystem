/* This get request is used by employee to get all his/her schedule lectures */

const OnlineLectureSchedules = require("../../../models/OnlineLectureSchedules");
const express = require("express");
const router = express.Router();
const authVerify = require("../../../customMiddleware/authVerify");
const ObjectID = require("mongodb").ObjectID;

// @route    GET api/onlineLecture/getAllScheduledLectures
// @access   Public (Used by employee)
router.get("/", authVerify, async (req, res) => {
  try {
    let schedules = await OnlineLectureSchedules.find(
      {
        schoolId: new ObjectID(res.locals.decoded.schoolId),
        employeeId: new ObjectID(res.locals.decoded.userId),
      },
      {
        schoolId: 0,
        employeeId: 0,
        __v: 0,
      }
    );

    return res.json(schedules);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;

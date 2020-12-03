/* This post request is used by employee to cancel a scheduled lecture */

const OnlineLectureSchedules = require("../../../models/OnlineLectureSchedules");
const express = require("express");
const router = express.Router();
const authVerify = require("../../../customMiddleware/authVerify");
const { check, validationResult } = require("express-validator/check");
const ObjectID = require("mongodb").ObjectID;

// @route    POST api/onlineLecture/cancelScheduledLecture
// @access   Public (Used by employee)
router.post("/", authVerify, async (req, res) => {
  try {
    const { scheduleId } = req.body;

    await OnlineLectureSchedules.deleteOne({
      schoolId: new ObjectID(res.locals.decoded.schoolId),
      employeeId: new ObjectID(res.locals.decoded.userId),
      _id: new ObjectID(scheduleId),
    });

    return res.sendStatus(200);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;

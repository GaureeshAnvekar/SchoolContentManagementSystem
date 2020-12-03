/* This post request is used by employee to schedule online lecture for students */

const OnlineLectureSchedules = require("../../../models/OnlineLectureSchedules");
const express = require("express");
const router = express.Router();
const authVerify = require("../../../customMiddleware/authVerify");
const { check, validationResult } = require("express-validator/check");
const ObjectID = require("mongodb").ObjectID;

// @route    POST api/onlineLecture/scheduleLecture
// @access   Public (Used by employee)
router.post(
  "/",
  authVerify,
  [
    check("dateTime", "Select the date and time").not().isEmpty(),
    check("studentClass", "Select the class").not().isEmpty(),
    check("section", "Select the section").not().isEmpty(),
    check("topic", "Select the topic").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { dateTime, studentClass, section, topic } = req.body;

      //check if any lecture is scheduled in between the requested time upto +60 mins
      let lectureDateTimeObjStart = new Date(dateTime);

      let lectureDateTimeObjEnd = new Date(
        lectureDateTimeObjStart.getTime() + 60 * 60000
      );

      //first check if this employee has already scheduled a lecture for this time +60 - 60.

      let booked = await OnlineLectureSchedules.findOne({
        schoolId: new ObjectID(res.locals.decoded.schoolId),
        employeeId: new ObjectID(res.locals.decoded.userId),
        $or: [
          {
            scheduleDateTimeEnd: {
              $gte: lectureDateTimeObjStart,
              $lte: lectureDateTimeObjEnd,
            },
          },
          {
            scheduleDateTimeStart: {
              $gte: lectureDateTimeObjStart,
              $lte: lectureDateTimeObjEnd,
            },
          },
        ],
      });

      if (booked) {
        return res.status(400).json({
          errors: [
            { msg: "You already have a scheduled lecture for this period" },
          ],
        });
      }

      // Now check if the class & section is already been booked
      let schedule = await OnlineLectureSchedules.find({
        schoolId: new ObjectID(res.locals.decoded.schoolId),
        employeeId: new ObjectID(res.locals.decoded.userId),
        class: studentClass,
        section: section,
        $or: [
          {
            scheduleDateTimeEnd: {
              $gte: lectureDateTimeObjStart,
              $lte: lectureDateTimeObjEnd,
            },
          },
          {
            scheduleDateTimeStart: {
              $gte: lectureDateTimeObjStart,
              $lte: lectureDateTimeObjEnd,
            },
          },
        ],
      });

      if (schedule.length > 0) {
        return res.status(400).json({
          errors: [{ msg: "This schedule is not available" }],
        });
      }

      // Else save this schedule
      let scheduleLecture = new OnlineLectureSchedules({
        schoolId: new ObjectID(res.locals.decoded.schoolId),
        employeeId: new ObjectID(res.locals.decoded.userId),
        class: studentClass,
        section: section,
        scheduleDateTimeStart: lectureDateTimeObjStart,
        scheduleDateTimeEnd: lectureDateTimeObjEnd,
        topic: topic,
      });

      await scheduleLecture.save();

      return res.sendStatus(200);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;

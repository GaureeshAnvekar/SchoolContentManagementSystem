/* Get books to notify of a student from a school
 * JWT is verified.
 */

const Students = require("../../../models/Students");
const express = require("express");
const router = express.Router();
const authVerify = require("../../../customMiddleware/authVerify");
const ObjectID = require("mongodb").ObjectID;

// @route    POST api/students/getBooksToNotifyList
// @desc     To get a student's books to notify list
// @access   Public (Used by student)
router.get("/", authVerify, async (req, res) => {
  try {
    let schoolId = res.locals.decoded.schoolId;
    let userId = res.locals.decoded.userId;

    const booksToNotifyArr = await Students.find(
      {
        school: new ObjectID(schoolId),
        _id: new ObjectID(userId),
      },
      {
        _id: 0,
        booksToNotify: 1,
      }
    );

    return res.json(booksToNotifyArr);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;

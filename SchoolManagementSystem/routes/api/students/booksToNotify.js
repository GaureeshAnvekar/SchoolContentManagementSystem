/* To save library books so that it can be notified to student once available in library from a school.
 * JWT is verified.
 */

const Students = require("../../../models/Students");
const express = require("express");
const router = express.Router();
const authVerify = require("../../../customMiddleware/authVerify");
const ObjectID = require("mongodb").ObjectID;

// @route    POST api/students/booksToNotify
// @desc     To save student's books to notify list
// @access   Public (Used by student)
router.post("/", authVerify, async (req, res) => {
  const booksToNotifyArr = req.body;

  try {
    let schoolId = res.locals.decoded.schoolId;
    let userId = res.locals.decoded.userId;

    await Students.findOneAndUpdate(
      {
        school: new ObjectID(schoolId),
        _id: new ObjectID(userId),
      },
      {
        booksToNotify: booksToNotifyArr,
      },
      { upsert: true, new: true }
    );

    return res.sendStatus(200);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;

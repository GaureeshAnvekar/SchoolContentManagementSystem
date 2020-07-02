/* To get pdf of an assignment of a student from a school.
 */

const express = require("express");
const router = express.Router();

// @route    GET api/students/pdfs/
// @desc     To get student's attendance status
// @access   Public (Used by student)
router.get("/", async (req, res) => {
  try {
    express.static("../pdfs/test.pdf");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;

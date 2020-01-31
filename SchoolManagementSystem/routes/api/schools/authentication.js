/* Handles all school routes */
const express = require("express");
const router = express.Router();
const authVerify = require("../../../customMiddleware/authVerify");
const Schools = require("../../../models/Schools");
const { check, validationResult } = require("express-validator/check");
const jwt = require("jsonwebtoken");
const config = require("config");
const bcrypt = require("bcryptjs");

// @route     GET api/schools/authentication (Temporary)
// @desc      To verify jwt. No data coming from request body
// @access    Public (Also called protected route as verification is done)
// 2 callbacks used
router.get("/", authVerify, async (req, res) => {
  try {
    const school = await Schools.findById(req.schoolId).select("-password");
    res.json("School authentication verified by admin");
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error");
  }
});

// @route     POST api/schools/authentication
// @desc      If jwt not present  on client side (admin) then login to school with admin name and password, then create and send jwt to the client.
//            jwt has got expiry date. So if it expires, admin has to enter admin name and password. This will regenerate jwt and sent it to client.
// @access    Public
router.post(
  "/",
  [
    check("adminName", "Admin name is required")
      .not()
      .isEmpty(),
    check("adminPassword", "Admin password is required").exists()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    }

    try {
      // See if school exists
      const { adminName, adminPassword } = req.body;
      let school = await Schools.findOne({
        name: "St. Xavier's High School",
        adminname: adminName
      });

      if (!school) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid credentials" }] });
      }
      //console.log(school.adminpassword);
      //console.log(adminPassword);
      // Once school exists is cleared, then check password
      const isMatch = await bcrypt.compare(adminPassword, school.adminpassword);

      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid credentials" }] });
      }

      // Details to create jwt
      const payload = {
        school: { id: school.id, adminName: school.adminname }
      };

      jwt.sign(
        payload,
        config.get("jwtAdminPrivateKey"),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;

/* Handles all school routes */
const express = require("express");
const router = express.Router();
const authVerify = require("../../../customMiddleware/authVerify");
const Schools = require("../../../models/Schools");
const { check, validationResult } = require("express-validator/check");
const jwt = require("jsonwebtoken");
const config = require("config");
const bcrypt = require("bcryptjs");
const ObjectID = require("mongodb").ObjectID;

// @route     GET api/schools/authentication (Temporary)
// @desc      To verify jwt. No data coming from request body
// @access    Public (Also called protected route as verification is done)
// 2 callbacks used
router.get("/", authVerify, async (req, res) => {
  try {
    const school = await Schools.findById(req.schoolId).select("-password");
    const payload = {
      school: school
    };
    res.json(payload);
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
    check("username", "User name is required")
      .not()
      .isEmpty(),
    check("password", "Password is required")
      .not()
      .isEmpty(),
    check("loginType", "Login type is required")
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    }

    try {
      // See if school exists
      const { username, password, loginType, schoolId } = req.body;
      console.log(
        "username is " +
          username +
          " password is " +
          password +
          " login type is " +
          loginType +
          " school id is " +
          schoolId
      );

      if (loginType == "admin") {
        let school = await Schools.findOne({
          _id: new ObjectID(schoolId),
          adminname: username
        });

        if (!school) {
          console.log("school not found");
          return res
            .status(400)
            .json({ errors: [{ msg: "Invalid credentials" }] });
        }

        // Once school exists is cleared, then check password
        const isMatch = await bcrypt.compare(password, school.adminpassword);

        if (!isMatch) {
          console.log(" password wrong");
          return res
            .status(400)
            .json({ errors: [{ msg: "Invalid credentials" }] });
        }

        // Details to create jwt
        const payload = {
          school: {
            username: school.adminname,
            loginType: loginType
          }
        };

        jwt.sign(
          payload,
          config.get("jwtAdminPrivateKey"),
          { expiresIn: 360000 },
          (err, token) => {
            if (err) throw err;
            payload.school["token"] = token;
            res.json(payload);
          }
        );
      } // else do it for students, employee, library.
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;

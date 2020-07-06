/* This authentication, i.e. GET request to login the librarian of a school.
 * During the first login  from a given school, jwt is not sent from the client. So a post request is used.
 * IF jwt already present with client(librarian), use a get request.
 */

const jwt = require("jsonwebtoken");
const config = require("config");
const bcrypt = require("bcryptjs");
const Schools = require("../../../models/Schools");
const express = require("express");
const router = express.Router();
const authVerify = require("../../../customMiddleware/authVerify");
const { check, validationResult } = require("express-validator/check");
const ObjectID = require("mongodb").ObjectID;

// @route     GET api/library/authentication
// @desc      If jwt present on client side then use this route to verify jwt. No data coming from request body.
// @access    Public (Also called protected route as verification is done)
// 2 callbacks used
router.get("/", authVerify, async (req, res) => {
  try {
    const decoded = res.locals.decoded;

    // For admin or librarian the user id is same as school id
    let school = await Schools.findOne({
      _id: decoded.userId,
    });

    const payload = {
      isAuth: true,
      jwt: decoded.token,
    };

    res.json(payload);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error");
  }
});

// @route    POST api/students/authentication
// @desc     Used when jwt is not present with client(student). Will check credentials, and in turn send a jwt
// @access   Public (Used by student)
router.post(
  "/",
  [
    check("username", "User name is required").not().isEmpty(),
    check("password", "Password is required").not().isEmpty(),
    check("loginType", "Login type is required").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // See if school exists
      const { schoolId, username, password, loginType } = req.body;
      let school = await Schools.findOne({
        _id: new ObjectID(schoolId),
      });

      if (!school) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid credentials" }] });
      }

      // If school name is matched, now check password
      const isMatch = await bcrypt.compare(password, school.adminpassword);

      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid credentials" }] });
      }

      // Details to create jwt.
      const jwtPayload = {
        userId: school.id,
        userName: username,
        schoolId: schoolId,
        loginType: loginType,
      };

      jwt.sign(
        jwtPayload,
        config.get("jwtStudentPrivateKey"),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          const payload = {
            jwt: token,
            loginType: loginType,
          };

          return res.json(payload);
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;

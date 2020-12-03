/* This authentication, i.e. GET request to login an employee will be used by an employee.
 * The login credentials will be given by the school to the employees.
 * During the first login of an employee from a given school, jwt is not sent from the client. So a post request is used.
 * IF jwt already present with client(employee), use a get request.
 */

const jwt = require("jsonwebtoken");
const config = require("config");
const bcrypt = require("bcryptjs");
const Employees = require("../../../models/Employees");
const express = require("express");
const router = express.Router();
const authVerify = require("../../../customMiddleware/authVerify");
const { check, validationResult } = require("express-validator/check");
const ObjectID = require("mongodb").ObjectID;

// @route     GET api/employees/authentication
// @desc      If jwt present on client side (employee) then use this route to verify jwt. No data coming from request body.
// @access    Public (Also called protected route as verification is done)
// 2 callbacks used
router.get("/", authVerify, async (req, res) => {
  try {
    const decoded = res.locals.decoded;

    let employee = await Employees.findOne({
      schoolId: new ObjectID(decoded.schoolId),
      username: decoded.userName,
      _id: decoded.userId,
    });

    const payload = {
      jwt: decoded.token,
      userName: decoded.userName,
      firstName: employee.firstname,
      lastName: employee.lastname,
      gender: employee.gender,
      dob: employee.dob,
      email: employee.email,
      loginType: decoded.loginType,
    };
    console.log("Get 1 time");
    res.json(payload);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error");
  }
});

// @route    POST api/employees/authentication
// @desc     Used when jwt is not present with client(employee). Will check credentials, and in turn send a jwt
// @access   Public (Used by employee)
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
      // See if employee exists
      const { schoolId, username, password, loginType } = req.body;

      let employee = await Employees.findOne({
        schoolId: new ObjectID(schoolId),
        username: username,
      });

      if (!employee) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid credentials" }] });
      }

      // If employee name is matched, now check password
      const isMatch = await bcrypt.compare(password, employee.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid credentials" }] });
      }

      // Details to create jwt. Separate private key is used for student login jwt.
      const jwtPayload = {
        userId: employee.id,
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
            userName: username,
            firstName: employee.firstname,
            lastName: employee.lastname,
            gender: employee.gender,
            dob: employee.dob,
            email: employee.email,
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

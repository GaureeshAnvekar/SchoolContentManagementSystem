const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const router = express.Router();
const { check, validationResult } = require("express-validator/check");
const authVerify = require("../../../customMiddleware/authVerify");
const ObjectID = require("mongodb").ObjectID;
const Schools = require("../../../models/Schools");
const Employees = require("../../../models/Employees");

// @route     POST api/employees/registration
// @desc      Registering an employee (create or update). Will be used by the schools to register employees. So jwt verification
//            is done on admin's jwt.
// @access    Public
router.post(
  "/",
  [
    authVerify,
    [
      check("firstName", "Employee's first name is required").not().isEmpty(),
      check("lastName", "Employee's last name is required").not().isEmpty(),
      check("password", "Password is required with min 6 characters").isLength({
        min: 6,
      }),
      check("dob", "Date of birth is required").not().isEmpty(),
      check("email", "Email id is required").not().isEmpty(),
      check("gender", "Gender is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(404).json({ errors: errors.array() });
    }

    try {
      // See if an employee exists
      const {
        schoolId,
        firstName,
        lastName,
        password,
        gender,
        dob,
        email,
      } = req.body;

      // Here school id should also be used to find an employee. This info can be present as sub-domain
      let employee = await Employees.findOne({
        schoolId: new ObjectID(schoolId),
        username: firstName + lastName,
      });

      // dob is DD-MM-YYYY, so dateArrr will contain DD, MM, YYYY
      const dateArr = String(dob).split("-");

      if (employee) {
        // Use a property from body object to check if update is required
        if (req.body.update == "true") {
          // update
          newData = {
            firstname: firstName,
            lastname: lastName,
            password: password,
            dob: new Date(dateArr[2], dateArr[1], dateArr[0]),
            email: email,
            gender: gender,
          };
          employee = await Employees.findOneAndUpdate(
            {
              school: new ObjectID(schoolId),
              username: firstName + lastName,
            },
            { $set: newData },
            { new: true }
          );
          // Encrypt password using bcrypt
          const salt = await bcrypt.genSalt(10);
          employee.password = await bcrypt.hash(password, salt);

          await employee.save();

          console.log("employee updated");
          return res.json(employee);
        } else {
          return res
            .status(400)
            .json({ errors: [{ msg: "Employee already exists" }] });
        }
      }

      employee = new Employees({
        school: schoolId,
        username: firstName + lastName,
        firstname: firstName,
        lastname: lastName,
        password: password,
        dob: new Date(dateArr[2], dateArr[1], dateArr[0]),
        email,
        gender,
      });

      // Encrypt password using bcrypt
      const salt = await bcrypt.genSalt(10);
      employee.password = await bcrypt.hash(password, salt);

      await employee.save();
      res.json("employee registered by admin");
      // No need to create jwt as student creation is done by school admin.
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;

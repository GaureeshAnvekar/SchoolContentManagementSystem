const express = require("express");
const router = express.Router();
const authVerify = require("../../customMiddleware/authVerify");

// @route     GET api/decodeJWT
// @desc      If jwt present on client side then use this route to verify jwt and send back login type. No data coming from request body.
// @access    Public (Also called protected route as verification is done)
// 2 callbacks used
router.get("/", authVerify, async (req, res) => {
  try {
    const decoded = res.locals.decoded;

    const payload = {
      loginType: decoded.loginType,
    };
    res.json(payload);
    //if (!student) {
    //  return res
    //  .status(400)
    //.json({ msg: "There is no student with this name" });
    //}

    //return res.json(profile);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;

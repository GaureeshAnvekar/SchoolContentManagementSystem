/* Custom middleware callback to protect authentication routes. This callback will
 * verify the JWT sent from the client using req object
 */
const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function (req, res, next) {
  // Get token from header of req
  const token = req.header("x-auth-token");
  console.log(token);
  // Check if no token
  if (!token) {
    return res.status(401).json({ errors: [{ msg: "No token sent" }] });
  }

  // Verify token
  try {
    decoded = null;

    decoded = jwt.verify(token, config.get("jwtStudentPrivateKey"));

    decoded = {
      userId: decoded.userId,
      userName: decoded.userName,
      schoolId: decoded.schoolId,
      token: token,
      loginType: decoded.loginType,
    };

    console.log("token verified");
    console.log(decoded);

    res.locals.decoded = decoded;
    next();
  } catch (err) {
    console.log(err.message);
    res.status(401).json({ errors: [{ msg: "Invalid token" }] });
  }
};

/* Custom middleware callback to protect authentication routes. This callback will
 * verify the JWT sent from the client using req object
 */
const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function(req, res, next) {
  // Get token from header of req
  const token = req.header("x-auth-token");

  // Check if no token
  if (!token) {
    return res.status(401).json({ msg: "No token, authentication failed" });
  }

  // Verify token
  try {
    decoded = null;

    if (req.body.jwtType == "school") {
      decoded = jwt.verify(token, config.get("jwtAdminPrivateKey"));
    } else {
      decoded = jwt.verify(token, config.get("jwtStudentPrivateKey"));
    }

    next();
  } catch (err) {
    console.log(err.message);
    res.status(401).json({ msg: "Token is not valid" });
  }
};

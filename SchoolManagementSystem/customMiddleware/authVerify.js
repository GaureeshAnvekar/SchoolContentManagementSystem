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
    return res.status(401).json({ errors: [{ msg: "No token sent" }] });
  }

  // Verify token
  try {
    decoded = null;

    decoded = jwt.verify(token, config.get("jwtAdminPrivateKey"));

    const payload = {
      school: {
        id: decoded.school.id,
        username: decoded.school.username,
        loginType: decoded.school.loginType,
        token: token
      }
    };

    console.log("token verified");
    console.log(decoded);

    res.locals.payload = payload;
    next();
  } catch (err) {
    console.log(err.message);
    res.status(401).json({ errors: [{ msg: "Invalid token" }] });
  }
};

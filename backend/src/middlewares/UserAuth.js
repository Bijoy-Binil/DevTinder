const jwt = require("jsonwebtoken");

const UserAuth = (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return res.status(401).send("Please Login");
  }
  try {
    const user = jwt.verify(token, "DevTinder@12");
    req.user = user;
    next();
  } catch (error) {
    // Invalid/expired token: clear it and respond so the request settles
    // (otherwise the client hangs forever and never redirects to login).
    res.cookie("token", null, { expires: new Date(0) });
    return res.status(401).send("Invalid or expired token. Please login again.");
  }
};
module.exports = UserAuth;

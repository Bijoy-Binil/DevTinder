const jwt = require("jsonwebtoken");

const UserAuth = (req, res, next) => {
  const {token} = req.cookies;
  if (!token) {
    throw new Error("Token is not valid!!");
  }
  try {
    const decodeToken = jwt.verify(token, "DevTinder@12");
    console.log("decodeToken=>", decodeToken);
    req.user=decodeToken
    next();
  } catch (error) {
    console.log(error);
  }
};
module.exports = UserAuth;


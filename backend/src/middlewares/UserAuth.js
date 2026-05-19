const jwt = require("jsonwebtoken");

const UserAuth = (req, res, next) => {
  const {token} = req.cookies;
  if (!token) {
    return res.status(401).send("Please Login")
    
  }
  try {
    const user = jwt.verify(token, "DevTinder@12");
    console.log("user=>", user);
    req.user=user
    next();
  } catch (error) {
    console.log(error);
  }
};
module.exports = UserAuth;


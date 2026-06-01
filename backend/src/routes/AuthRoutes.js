const express = require("express");
const User = require("../models/user");
const { EmailValidator } = require("../utils/validators");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
  try {
    const { firstName, lastName, emailId, password, age,about,skills,gender,photo_url } = req.body;
    EmailValidator(req);
    const userPassword = await bcrypt.hash(password, 10);
    const userData = {
      firstName,
      lastName,
      emailId,
      password: userPassword,
      age,
      about,
      gender,
      photo_url,
      skills
    };
    const user = new User(userData);
    await user.save();
// console.log("skills =>", skills);
// console.log("type =>", typeof skills);
    res.send("User created successfully");
  } catch (error) {
    res.send("Error :" + error);
  }
});

authRouter.post("/login", async (req, res) => {
  const { emailId, password } = req.body;
  // console.log("password==>", password);
  try {
    const user = await User.findOne({ emailId });
    // console.log("user==>", user);
    const isUser = await bcrypt.compare(password, user.password);
    // console.log("isUser==>", isUser);
    if (isUser) {
      const token = jwt.sign({ userId: user._id }, "DevTinder@12");
      res.cookie("token", token);
    }

    if (isUser) {
      res.send(user);
    } else {
      throw new Error("Invalid Username or Password");
    }
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

authRouter.post("/logout", async (req, res) => {
  res.cookie("token", null, { expires: new Date(0) });
  res.send("Logout Successfully");
});

module.exports = authRouter;

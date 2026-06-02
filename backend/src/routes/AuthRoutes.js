const express = require("express");
const User = require("../models/user");
const { EmailValidator } = require("../utils/validators");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
  try {
    const { firstName, lastName, emailId, password, age, about, skills, gender, photo_url } = req.body;
    EmailValidator(req);
    if (!firstName) {
      throw new Error("First name is required");
    }
    if (!password || password.length < 6) {
      throw new Error("Password must be at least 6 characters long");
    }

    const existingUser = await User.findOne({ emailId });
    if (existingUser) {
      throw new Error("Email is already registered");
    }

    const userPassword = await bcrypt.hash(password, 10);

    // Only set optional fields when provided so schema defaults/validators
    // (e.g. photo_url URL check, gender enum) don't reject empty values.
    const userData = { firstName, lastName, emailId, password: userPassword };
    if (age !== undefined && age !== null && age !== "") userData.age = age;
    if (about) userData.about = about;
    if (gender) userData.gender = gender;
    if (photo_url) userData.photo_url = photo_url;
    if (skills) userData.skills = skills;

    const user = new User(userData);
    await user.save();

    const token = jwt.sign({ userId: user._id }, "DevTinder@12");
    res.cookie("token", token);

    const savedUser = user.toObject();
    delete savedUser.password;
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

authRouter.post("/login", async (req, res) => {
  const { emailId, password } = req.body;
  try {
    const user = await User.findOne({ emailId });
    // No account for this email — guard before touching user.password so we
    // return a clean 400 instead of crashing on null.
    if (!user) {
      throw new Error("Invalid Username or Password");
    }

    const isUser = await bcrypt.compare(password, user.password);
    if (!isUser) {
      throw new Error("Invalid Username or Password");
    }

    const token = jwt.sign({ userId: user._id }, "DevTinder@12");
    res.cookie("token", token);

    const safeUser = user.toObject();
    delete safeUser.password;
    res.send(safeUser);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

authRouter.post("/logout", async (req, res) => {
  res.cookie("token", null, { expires: new Date(0) });
  res.json({ message: "Logout Successfully" });
});

module.exports = authRouter;

const express = require("express");
const User = require("../models/user");
const UserAuth = require("../middlewares/UserAuth");
const { validateEditProfileData, passwordValidator } = require("../utils/validators");
const profileRouter = express.Router();
const bcrypt=require('bcrypt')

profileRouter.get("/view", UserAuth, async (req, res) => {
  try {
    const user = req.user;
    const userData = await User.findById(req.user.userId);
    res.send(userData);
  } catch (error) {
    res.status(400).send("Error :" + error.message);
  }
});

profileRouter.patch("/edit", UserAuth, async (req, res) => {
  if (!validateEditProfileData(req)) {
    throw new Error("Invalid Edit Field");
  }

  const userId = req.user.userId;
  const currId = req.body._id;
  if (currId && currId !== userId) {
    throw new Error("Unauthorized to edit other user's profile");
  }
  const data = req.body;
  console.log("data==>", data);
  console.log("userId==>", userId);
  try {
    const updatedData = await User.findOneAndUpdate({ _id: userId }, req.body);
    res.send(updatedData);
    res.send("User Updated successfully");
  } catch (error) {
    res.send("Error Updating user");
  }
});
profileRouter.patch("/forgot-password", UserAuth, async (req, res) => {
  const { emailId, password } = req.body;
  const authUser=req.user.userId
  console.log("newPassword==>",password)
  try {
    const hashedPassword = await bcrypt.hash(password,10)
    console.log("hashedPassword==>",hashedPassword)
    const user = await User.findById( authUser );
    if (!user) {
      throw new Error("User not found");
    }
    if (!passwordValidator(req)) {
      throw new Error("Invalid password format");
    }
    const authUserId = req.user.userId;
    if (user._id.toString() !== authUserId) {
      throw new Error("Unauthorized to change another user's password");
    }
    user.password = hashedPassword;
    await user.save();
    res.send("Password updated successfully");
  } catch (error) {
    res.status(400).send("Error updating password: " + error.message);
  }
});

module.exports = profileRouter;

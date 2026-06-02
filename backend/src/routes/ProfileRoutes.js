const express = require("express");
const User = require("../models/user");
const UserAuth = require("../middlewares/UserAuth");
const {
  validateEditProfileData,
  passwordValidator,
} = require("../utils/validators");
const profileRouter = express.Router();
const bcrypt = require("bcrypt");

profileRouter.get("/view", UserAuth, async (req, res) => {
  try {
    const userData = await User.findById(req.user.userId);
    if (!userData) {
      return res.status(404).send("User not found");
    }
    const safeUser = userData.toObject();
    delete safeUser.password;
    res.send(safeUser);
  } catch (error) {
    res.status(400).send("Error :" + error.message);
  }
});

const ALLOWED_EDIT_FIELDS = [
  "firstName",
  "lastName",
  "age",
  "about",
  "gender",
  "photo_url",
];

profileRouter.patch("/edit", UserAuth, async (req, res) => {
  try {
    if (!validateEditProfileData(req)) {
      throw new Error("Invalid Edit Field");
    }

    const userId = req.user.userId;
    const currId = req.body._id;
    if (currId && currId !== userId) {
      throw new Error("Unauthorized to edit other user's profile");
    }

    // Only apply non-empty allowed fields so blank optional inputs
    // (e.g. gender/photo_url) don't trip schema validators or wipe values.
    const updates = {};
    for (const field of ALLOWED_EDIT_FIELDS) {
      const value = req.body[field];
      if (value !== undefined && value !== null && value !== "") {
        updates[field] = value;
      }
    }

    const updatedData = await User.findOneAndUpdate({ _id: userId }, updates, {
      new: true,
      runValidators: true,
    });
    if (!updatedData) {
      return res.status(404).json({ message: "User not found" });
    }
    const safeUser = updatedData.toObject();
    delete safeUser.password;
    res.send(safeUser);
  } catch (error) {
    res.status(400).json({ message: "Error Updating user: " + error.message });
  }
});
profileRouter.patch("/reset-password", UserAuth, async (req, res) => {
  const { emailId, password } = req.body;
  const authUser = req.user.userId;
  // console.log("newPassword==>", password);
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    // console.log("hashedPassword==>", hashedPassword);
    const user = await User.findById(authUser);
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

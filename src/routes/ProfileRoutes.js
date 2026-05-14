const express = require("express");
const UserAuth = require("../middlewares/UserAuth");

const profileRouter = express.Router();

profileRouter.get("/profile", UserAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (error) {
    res.status(400).send("Error :" + error.message);
  }
});

module.exports = profileRouter;

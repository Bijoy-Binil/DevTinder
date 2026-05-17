const express = require("express");
const userRouter = express.Router();
const userAuth = require("../middlewares/UserAuth");
const ConnectionRequest = require("../models/ConnectionRequest");
const User = require("../models/user");

userRouter.get("/requests/received", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const requests = await ConnectionRequest.find({
      toUserId: loggedInUser.userId,
      status: "interested",
    }).populate("fromUserId", ["firstName", "lastName"]);
    // console.log("requests===>", requests);
    return res
      .status(200)
      .json({ message: "All Request Fetched !!", data: requests });
  } catch (error) {
    res.status(400).json({
      message: `Error: ${error.message}`,
    });
  }
});

const USER_SAFE_DATA = "firstName lastName age photo_url gender";
userRouter.get("/connections", userAuth, async (req, res) => {
  try {
    const loggedUserIn = req.user;
    const connections = await ConnectionRequest.find({
      $or: [
        { toUserId: loggedUserIn.userId, status: "accepted" },
        { fromUserId: loggedUserIn.userId, status: "accepted" },
      ],
    })
      .populate("fromUserId", USER_SAFE_DATA)
      .populate("toUserId", USER_SAFE_DATA);

    const data = connections.map((row) => {
      if (row.fromUserId._id.toString() === loggedUserIn.userId) {
        return row.toUserId;
      }
      return row.fromUserId;
    });

    // console.log("connections==>", connections);
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({
      message: `Error : ${error.message}`,
    });
  }
});

userRouter.get("/feed", userAuth, async (req, res) => {
  try {

    const page = parseInt(req.query.page)||1;
    let limit = parseInt(req.query.limit)||10;
    const skip = (page-1)*limit;

    const loggedInUser = req.user;
    const connections = await ConnectionRequest.find({
      $or: [
        { fromUserId: loggedInUser.userId },
        { toUserId: loggedInUser.userId },
      ],
    }).select("fromUserId toUserId");

    const hideUsersFromFeed = new Set();

    connections.forEach((req) => {
      hideUsersFromFeed.add(req.fromUserId.toString());
      hideUsersFromFeed.add(req.toUserId.toString());
    });

    const users = await User.find({
      $and: [
        { _id: { $nin: Array.from(hideUsersFromFeed) } },
        { _id: { $ne: loggedInUser.userId } },
      ],
    }).select(USER_SAFE_DATA).skip(skip).limit(limit);

    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({
      message: `Error : ${error.message}`,
    });
  }
});

module.exports = userRouter;

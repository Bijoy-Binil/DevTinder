const express = require("express");
const UserAuth = require("../middlewares/UserAuth");
const User = require("../models/user");
const ConnectionRequest = require("../models/ConnectionRequest");

const requestRouter = express.Router();

requestRouter.post(
  "/send/:status/:toUserId",
  UserAuth,
  async (req, res) => {
    try {
      const fromUserId = req.user.userId;
      const toUserId = req.params.toUserId;

      const status = req.params.status;
      const allowedStatus = ["ignored", "interested"];
      if (!allowedStatus.includes(status)) {
        return res.status(400).json({
          message: "Invalid status type" + status,
        });
      }
      const isExisting = await ConnectionRequest.findOne({
        $or: [
          { fromUserId, toUserId },
          { fromUserId: toUserId, toUserId: fromUserId },
        ],
      });
      const toUser = await User.findById(toUserId);
      const fromUser = await User.findById(fromUserId);
      if (!toUser) {
        return res.status(400).json({
          message: "User Doesn't Exists !!",
        });
      }
      if (toUserId === fromUserId || fromUserId === toUserId) {
        return res.status(400).json({
          message: "Cannot sent connection to yourself",
        });
      }

      if (!isExisting) {
        const connectionRequestdata = await ConnectionRequest.create({
          toUserId,
          fromUserId,
          status,
        });
        return status === "interested"
          ? res.json({
              message: `${fromUser.firstName} is interested in ${toUser.firstName}`,
            })
          : res.json({
              message: `${fromUser.firstName} is not interested in ${toUser.firstName}`,
            });
      }
      res.status(400).json({
        message: "Connection Already Exists !!",
      });
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },
);
requestRouter.post(
  "/review/:status/:requestId",
  UserAuth,
  async (req, res) => {
    try {
      const loggedInUser = req.user;
      const allowedStatus = ["accepted", "rejected"];
      const { status, requestId } = req.params;
      if (!allowedStatus.includes(status)) {
        throw new Error("Status Not Allowed");
      }
      const connectionRequest = await ConnectionRequest.findOne({
        _id: requestId,
        toUserId: loggedInUser.userId,
        status: "interested",
      });
console.log("requestId==>",requestId)
console.log("toUserId==>",loggedInUser.userId)
console.log("connectionRequest==>",connectionRequest)
      const connectionRequest1 = await ConnectionRequest.findById(requestId);

console.log("connectionRequest1==>",connectionRequest1)

      if (!connectionRequest) {
        throw new Error("Connection Request Not Found !!");
      }

      connectionRequest.status = status;
      const data = await connectionRequest.save();
      return res
        .status(200)
        .json({ message: "Connection Request" + status + data });
    } catch (error) {
      res.status(400).send(`Error: ${error.message}`);
    }
  },
);
module.exports = requestRouter;

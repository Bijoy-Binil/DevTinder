const express = require("express")
const UserAuth = require("../middlewares/UserAuth")
const User = require("../models/user")

const requestRouter=express.Router()


requestRouter.get('/sendConnectionRequest',UserAuth,async(req,res)=>{
 try {
  const userId=req.user.userId
 const userData=await User.findById(userId)
res.status(200).send(userData)
 } catch (error) {
  console.error(error)
  res.status(500).send(error)
 }
})


module.exports = requestRouter
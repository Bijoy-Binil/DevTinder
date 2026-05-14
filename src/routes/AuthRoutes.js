const express=require('express')
const User = require("../models/user");
const validateEmail = require("../utils/validators");
const jwt = require('jsonwebtoken')
const bcrypt=require('bcrypt')

const authRouter=express.Router()


 authRouter.post("/signup", async (req, res) => {
   try {
     const { firstName, lastName, emailId, password, age } = req.body;
     validateEmail(req);
     const userPassword = await bcrypt.hash(password, 10);
     const userData = {
       firstName,
       lastName,
       emailId,
       password: userPassword,
       age,
     };
     const user = new User(userData);
     await user.save();
 
     res.send("User created successfully");
   } catch (error) {
     res.send("Error :" + error);
   }
 });
 
 authRouter.post("/login", async (req, res) => {
   const {emailId,password} = req.body;
   try {
     const user =await User.findOne({emailId})
 
    const isUser=await bcrypt.compare(password,user.password)
    if(user){
     const token = jwt.sign({userId:user._id},"DevTinder@12")
     res.cookie("token",token)
     console.log("Token==>",token)
    }
   if(isUser){
     res.send("User LoggedIn successfully");
   }else{
     throw new Error("Invalid Credential given!!")
   }
     res.send("User LoggedIn successfully");
   } catch (error) {
     res.status(400).send("Error: "+error);
   }
 });


 authRouter.post("/logout", async (req, res) => {
    res.cookie("token",null,{expires:new Date(0)})
    res.send("Logout Successfully")
 });


 authRouter.patch("/update", async (req, res) => {
   const userId = req.body._id;
   const data = req.body;
   console.log("data==>", data);
   console.log("userId==>", userId);
   try {
     const allUsers = await User.findOneAndUpdate({ _id: userId }, req.body);
     res.send(allUsers);
     res.send("User Updated successfully");
   } catch (error) {
     res.send("Error Updating user");
   }
 });
 

module.exports= authRouter
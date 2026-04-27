// import express from 'express' - verified nodemon fix
const express = require("express");
const bcrypt = require("bcrypt");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");
const AdminAuth = require("./middlewares/AdminAuth");
const migrate = require("./scripts/migrate");
const validateEmail = require("./utils/validators");
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const UserAuth = require('../src/middlewares/UserAuth')
app.use(express.json());
app.use(cookieParser()); 

// app.get('/admin/login', (req, res) => {
//     res.send("Login Route");
// });

app.post("/user/signup", async (req, res) => {
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

app.post("/user/login", async (req, res) => {
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
app.patch("/user/update", async (req, res) => {
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



app.get('/connect',UserAuth,async(req,res)=>{
 const userId=req.user.userId
 console.log("userId==>",userId)
 const userData=await User.findById(userId)
 console.log("userData==>",userData)
res.send("Connected")
})





const startServer = async () => {
  try {
    await connectDB();
    console.log("Database connection established");

    await migrate(); // ✅ now valid

    app.listen(7777, () => {
      console.log("🚀 Server running on port 7777");
    });
  } catch (error) {
    console.error("Startup error:", error);
  }
};

startServer();

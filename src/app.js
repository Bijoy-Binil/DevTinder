// import express from 'express' - verified nodemon fix
const express = require("express");
const bcrypt = require("bcrypt");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");
const AdminAuth = require("./middlewares/AdminAuth");
const migrate = require("./scripts/migrate");

const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const UserAuth = require('../src/middlewares/UserAuth');
const authRouter = require("./routes/AuthRoutes");
const requestRouter = require("./routes/RequestRoutes");
const profileRouter = require("./routes/ProfileRoutes");
app.use(express.json());
app.use(cookieParser()); 

// app.get('/admin/login', (req, res) => {
//     res.send("Login Route");
// });

app.use("/user", authRouter);
app.use("/user", requestRouter);
app.use("/profile",profileRouter);

const startServer = async () => {
  try {
    await connectDB();
    console.log("Database connection established");

    await migrate(); 

    app.listen(7777, () => {
      console.log("🚀 Server running on port 7777");
    });
  } catch (error) {
    console.error("Startup error:", error);
  }
};

startServer();

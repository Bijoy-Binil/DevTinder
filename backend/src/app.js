// import express from 'express' - verified nodemon fix
require("dotenv").config();
const express = require("express");
const bcrypt = require("bcrypt");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");
const AdminAuth = require("./middlewares/AdminAuth");
const migrate = require("./scripts/migrate");
const cors = require("cors");

const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const UserAuth = require("../src/middlewares/UserAuth");
const authRouter = require("./routes/AuthRoutes");
const requestRouter = require("./routes/RequestRoutes");
const profileRouter = require("./routes/ProfileRoutes");
const userRouter = require("./routes/User");
app.use(express.json());
app.use(cookieParser());

const corsOptions = {
  origin: 'http://localhost:5173', 
  credentials: true
};
app.use(cors(corsOptions));
// app.get('/admin/login', (req, res) => {
//     res.send("Login Route");
// });

app.use("/", authRouter);
app.use("/user", userRouter);
app.use("/request", requestRouter);
app.use("/profile", profileRouter);

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

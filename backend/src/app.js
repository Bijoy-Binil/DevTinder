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

// In production the frontend is served same-origin via nginx (/api -> backend),
// so CORS is not exercised. CORS_ORIGIN lets cross-origin dev/staging still work.
const corsOptions = {
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
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

const PORT = process.env.PORT || 7777;

const startServer = async () => {
  if (!process.env.DB_URL) {
    // Most common deploy mistake: .env is gitignored, so the server has no DB_URL.
    console.error(
      "⚠️  DB_URL is not set. Create backend/.env on the server before starting."
    );
  }

  // connectDB logs its own success/failure and does NOT throw.
  await connectDB();

  // Migration must never prevent the server from listening — otherwise a DB
  // hiccup turns every request into an nginx 502 with no useful error.
  try {
    await migrate();
  } catch (error) {
    console.error("Migration skipped due to error:", error.message);
  }

  // Always listen so requests get real responses (200/401/500) instead of 502.
 app.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
};

startServer();

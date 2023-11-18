const express = require("express");

const { UserModel } = require("../models/user.model");
const { BlacklistModel } = require("../models/blacklist.model");
const { uuidv4 } = require("../configs/uuidGenerator");
const { authMiddleware } = require("../middlewares/authMiddleware.middleware");
const {
  registerUser,
  userLogin,
  userLogout,
  generateNewToken,
  updateUserDetails,
  getAllUsers,
  resetPassword,
  saveNewPassword,
  verifyOtp,
} = require("../controllers/user.controller");
// const cors =  require("cors")

require("dotenv").config();

const userRouter = express();

userRouter.use(express.json());
userRouter.post("/login", userLogin);

userRouter.post("/register", registerUser);

userRouter.get("/get", getAllUsers);

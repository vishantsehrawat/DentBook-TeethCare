const express = require("express");
const userRouter = express.Router();
const { authMiddleware } = require("../middlewares/authMiddleware");

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

userRouter.post("/login", userLogin);

userRouter.post("/register", registerUser);

userRouter.get("/resetUserPassword", authMiddleware, resetPassword);

userRouter.post("/saveNewPassword", authMiddleware, saveNewPassword);

userRouter.post("/verifyOtp", authMiddleware, verifyOtp);

userRouter.post("/logout", authMiddleware, userLogout);

userRouter.get("/newtoken", authMiddleware, generateNewToken);

userRouter.patch("/update/:id", authMiddleware, updateUserDetails);

userRouter.get("/get", getAllUsers);

module.exports = {
  userRouter,
};

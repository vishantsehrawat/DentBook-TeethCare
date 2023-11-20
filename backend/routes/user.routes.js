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
  // resetPassword,
  saveNewPassword,
  verifyOtp,
  forgotPassword,
} = require("../controllers/user.controller");
// const cors =  require("cors")

require("dotenv").config();

userRouter.post("/login", userLogin);

userRouter.post("/register", registerUser);

userRouter.get("/newtoken", authMiddleware, generateNewToken);

userRouter.patch("/update/:id", authMiddleware, updateUserDetails);

userRouter.get("/get", getAllUsers); //! need to add superadmin rbac here

userRouter.get("/forgotPassword", authMiddleware, forgotPassword);

// userRouter.get("/resetUserPassword", authMiddleware, resetPassword);

userRouter.post("/saveNewPassword", authMiddleware, saveNewPassword);

userRouter.post("/verifyOtp", authMiddleware, verifyOtp);

userRouter.post("/logout", authMiddleware, userLogout);

module.exports = {
  userRouter,
};

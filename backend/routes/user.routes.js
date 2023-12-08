/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API endpoints for managing users
 */

/**
 * @swagger
 * /user/login:
 *   post:
 *     summary: Login a user
 *     tags: [Users]
 *     requestBody:
 *       description: User's login credentials
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: User logged in successfully
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * paths:
 *   /user/register:
 *     post:
 *       summary: Register a new user
 *       tags: [Users]
 *       requestBody:
 *         description: Details required for user registration
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserRegistration'
 *       responses:
 *         '200':
 *           description: User registered successfully
 *         '400':
 *           description: Invalid input, user already exists
 *         '500':
 *           description: Internal server error
 * components:
 *   schemas:
 *     UserRegistration:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         email:
 *           type: string
 *           format: email
 *         password:
 *           type: string
 *       required:
 *         - name
 *         - email
 *         - password
 */

/**
 * @swagger
 * /user/newtoken:
 *   get:
 *     summary: Generate a new token
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '200':
 *         description: New token generated successfully
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /user/update/{id}:
 *   patch:
 *     summary: Update user details by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to update
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Updated user details
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserModel' // Assuming the User model schema definition
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '200':
 *         description: User details updated successfully
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /user/get:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '200':
 *         description: Users retrieved successfully
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /user/forgotPassword:
 *   get:
 *     summary: Request to reset password
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '200':
 *         description: Password reset requested successfully
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /user/saveNewPassword:
 *   post:
 *     summary: Save a new password
 *     tags: [Users]
 *     requestBody:
 *       description: Define the request body for saving a new password
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             // Add schema for saving a new password here
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '200':
 *         description: New password saved successfully
 *       '500':
 *         description: Internal server error
 */
/**
 * @swagger
 * /user/verifyOtp:
 *   post:
 *     summary: Verify OTP
 *     tags: [Users]
 *     requestBody:
 *       description: Define the request body for OTP verification
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             // Add schema for OTP verification here
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '200':
 *         description: OTP verified successfully
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /user/logout:
 *   post:
 *     summary: Logout a user
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '200':
 *         description: User logged out successfully
 *       '500':
 *         description: Internal server error
 */

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

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const store = require("store");
const { uuidv4 } = require("../configs/uuidGenerator");
const { UserModel } = require("../models/user.model");
const { BlacklistModel } = require("../models/blacklist.model");
const speakeasy = require("speakeasy");
const { sendEmailForVerification } = require("../configs/sendEmail");
const { sendSmsForVerification } = require("../configs/sendSms");

const registerUser = async (req, res) => {
  const userData = req.body;
  // // // console.log(
  // // // "🚀 ~ file: user.controller.js:10 ~ registerUser ~ userData:",
  // // // userData
  // // // );

  try {
    req.body.userUid = uuidv4();
    let alreadyPresent = await UserModel.findOne({ email: userData.email });
    if (alreadyPresent) {
      return res.status(400).json({
        message: "User is already present. Please use a different email.",
        success: false,
      });
    } else {
      const hash = bcrypt.hashSync(userData.password, 4);
      userData.password = hash;
      const user = new UserModel(userData);
      await user.save();
      return res.status(200).json({ message: "New user added", success: true });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "Cannot add new user",
      success: false,
      error: error.message,
    });
  }
};

const userLogin = async (req, res) => {
  const user = req.body;
  // // console.log("🚀 ~ file: user.controller.js:42 ~ userLogin ~ user:", user);

  try {
    const myUser = await UserModel.findOne({ email: user.email });
    if (myUser) {
      bcrypt.compare(user.password, myUser.password, function (err, result) {
        if (err || !result) {
          return res.status(400).json({
            message: "Invalid credentials",
            success: false,
          });
        }

        var token = jwt.sign({ userId: myUser._id }, process.env.TOKEN_SECRET, {
          expiresIn: "7d",
        });
        var refreshToken = jwt.sign(
          { userId: myUser._id },
          process.env.REFRESH_TOKEN_SECRET,
          { expiresIn: "24d" }
        );
        return res.status(200).json({
          message: "User logged in",
          token,
          refreshToken,
          userId: myUser._id,
          success: true,
        });
      });
    } else {
      return res
        .status(400)
        .json({ message: "User not found", success: false });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: error.message || "Error logging in",
      success: false,
    });
  }
};

const userLogout = async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  // console.log("🚀 ~ file: user.controller.js:87 ~ userLogout ~ token:", token);
  try {
    const blacklist = new BlacklistModel({ token });
    await blacklist.save();
    return res.status(200).json({ message: "Logged out", success: true });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Cannot logout", success: false });
  }
};

// ! generateNewToken not working right now
const generateNewToken = async (req, res) => {
  // const refreshToken = req.headers.authorization;
  const refreshToken = req.headers.authorization.split(" ")[1];
  // console.log(
  // "🚀 ~ file: user.controller.js:101 ~ generateNewToken ~ refreshToken:",
  // refreshToken
  // );

  try {
    var decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    if (decoded) {
      var token = jwt.sign(
        { userId: decoded.userId },
        process.env.TOKEN_SECRET,
        { expiresIn: "7d" }
      );
      return res.status(200).json({
        message: "New token generated",
        token,
        success: true,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message || "Error generating new token",
      success: false,
    });
  }
};

const updateUserDetails = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await UserModel.findByIdAndUpdate(id, req.body);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "User details updated successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

// ! adding admin rbac pending so skipping for now
const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find();
    return res.status(200).json({ users, success: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await UserModel.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }

    // Generate a secret and save it to the user document
    const secret = speakeasy.generateSecret();
    console.log(
      "🚀 ~ file: user.controller.js:186 ~ forgotPassword ~ secret:",
      secret
    );
    // debugger
    user.speakEasy.secretToken = secret.base32; // storing it inside user model
    await user.save();

    //^ will send below generated token to user through email or sms
    const token = speakeasy.totp({
      secret: secret.base32,
      encoding: "base32",
    });
    // await sendEmailForVerification(user._id, email, token); //* sending mail using nodemailer
    await sendSmsForVerification(user.phone, token); // * sending sms using  twilio
    return res.status(200).json({
      message: "Reset token sent successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
      error: error,
      success: false,
    });
  }
};
// * we have compare our sent otp with the otp saved in user document

const saveNewPassword = async (req, res) => {
  try {
    const { email, newPassword, otp } = req.body;
    console.log(
      "🚀 ~ file: user.controller.js:214 ~ saveNewPassword ~ req.body:",
      req.body
    );

    const user = await UserModel.findOne({ email });
    // console.log(
    //   "🚀 ~ file: user.controller.js:217 ~ saveNewPassword ~ user:",
    //   user
    // );

    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }

    const isValidToken = speakeasy.totp.verify({
      secret: user.speakEasy.secretToken,
      encoding: "base32",
      token: otp,
    });
    console.log(
      "🚀 ~ file: user.controller.js:228 ~ saveNewPassword ~ isValidToken:",
      isValidToken
    );
    if (!isValidToken) {
      return res.status(400).json({ message: "Invalid token", success: false });
    }

    const hash = bcrypt.hashSync(newPassword, 4);
    user.password = hash;
    await user.save();

    return res.status(200).json({
      message: "New password saved successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await UserModel.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }

    if (user.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP", success: false });
    }

    user.otp = null;
    await user.save();

    return res.status(200).json({
      message: "OTP verified successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

module.exports = {
  registerUser,
  userLogin,
  userLogout,
  generateNewToken,
  updateUserDetails,
  getAllUsers,
  saveNewPassword,
  verifyOtp,
  forgotPassword,
};

const jwt = require("jsonwebtoken");
const { UserModel } = require("../models/user.model");
const { BlacklistModel } = require("../models/blacklist.model");
require("dotenv").config();

const authMiddleware = async (req, res, next) => {
  try {
    // const token = req.headers.authorization;
    const token = req.headers.authorization.split(" ")[1]; // with Bearer
    // console.log(
    // "🚀 ~ file: authMiddleware.js:9 ~ authMiddleware ~ token:",
    // token
    // );
    if (!token) {
      return res.status(401).json({
        message: "Authorization token missing",
        success: false,
      });
    }

    const blackToken = await BlacklistModel.findOne({ token });
    if (blackToken) {
      return res.status(401).json({
        message: "User blacklisted, please login again",
        success: false,
      });
    }

    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    if (decoded) {
      req.body.userId = decoded.userId;
      const user = await UserModel.findOne({ _id: decoded.userId });
      if (!user) {
        return res.status(404).json({
          message: "User not found",
          success: false,
        });
      }
      req.role = user.role; //^? we can also send other details of the user with the request
      next();
    } else {
      return res.status(401).json({
        message: "Authorization error",
        success: false,
      });
    }
  } catch (error) {
    console.error("Authentication error:", error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

module.exports = {
  authMiddleware,
};

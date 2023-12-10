const mongoose = require("mongoose");

const referralSchema = new mongoose.Schema({
  referringUserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  referredUserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  referralCode: {
    type: String,
    unique: true,
    required: true,
  },
  referralLink: {
    type: String,
    unique: true,
    required: true,
  },
  referralStatus: {
    type: String,
    enum: ["Pending", "Completed"],
    default: "Pending",
  },
});

const ReferralModel = mongoose.model("Referral", referralSchema);

module.exports = ReferralModel;

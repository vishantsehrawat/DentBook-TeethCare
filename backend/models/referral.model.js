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
  referralDate: {
    type: Date,
    default: Date.now,
  },
  conversionDate: {
    type: Date,
  },
  rewardsEarned: {
    type: Number,
    default: 0,
  },
  rewardsRedeemed: {
    type: Number,
    default: 0,
  },
  rewardRedemptionDates: [Date],
  referralDetails: {
    name: String,
    email: String,
    phone: String,
    city: String,
    state: String,
    country: String,
  },
  referralSource: {
    type: String,
    enum: ["Social Media", "Website", "Email", "Other"],
  },
  rewardType: {
    type: String,
    enum: ["Discount", "Points", "Free Product"],
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const ReferralModel = mongoose.model("Referral", referralSchema);

module.exports = ReferralModel;

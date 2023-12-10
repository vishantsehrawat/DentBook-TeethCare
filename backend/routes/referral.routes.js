const express = require("express");
const referralRouter = express.Router();
const {
  createReferral,
  getReferralById,
  updateReferral,
  getAllReferrals,
} = require("../controllers/referralController");

referralRouter.post("/", createReferral);

referralRouter.get("/", getAllReferrals);

referralRouter.get("/:id", getReferralById);

referralRouter.put("/:id", updateReferral);

module.exports = { referralRouter };

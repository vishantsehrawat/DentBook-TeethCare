const express = require("express");
const referralRouter = express.Router();
const {
  createReferral,
  getReferralById,
  updateReferral,
  deleteReferral,
  getAllReferrals,
  getReferralsByStatus,
  getReferralsByUser,
  getReferralsByDate,
  getReferralsByConversion,
} = require("../controllers/referralController");

referralRouter.post("/", createReferral);

referralRouter.get("/", getAllReferrals);

referralRouter.get("/:id", getReferralById);

referralRouter.put("/:id", updateReferral);

referralRouter.delete("/:id", deleteReferral);

referralRouter.get("/status/:status", getReferralsByStatus);

referralRouter.get("/user/:userId", getReferralsByUser);

referralRouter.get("/date/:startDate/:endDate", getReferralsByDate);

referralRouter.get("/conversion/:startDate/:endDate", getReferralsByConversion);

module.exports = { referralRouter };

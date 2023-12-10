const { ReferralModel } = require("../models/referral.model");

const createReferral = async (req, res) => {
  try {
    const newReferral = new ReferralModel(req.body);
    await newReferral.save();

    return res.status(201).json({
      message: "Referral created successfully",
      success: true,
      referral: newReferral,  
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Cannot create referral",
      success: false,
      error: error.message,
    });
  }
};

const getAllReferrals = async (req, res) => {
  try {
    const referrals = await ReferralModel.find();
    return res.status(200).json({
      message: "All referrals fetched successfully",
      success: true,
      referrals,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Cannot fetch referrals",
      success: false,
      error: error.message,
    });
  }
};


module.exports = {
  createReferral,
  getAllReferrals,
  getReferralById,
  updateReferral,
  deleteReferral,
  getReferralsByStatus,
};

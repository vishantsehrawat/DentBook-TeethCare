const { ComplaintModel } = require("../models/complaint.model");

const getAllComplaints = async (req, res) => {
  try {
    const complaints = await ComplaintModel.find();
    return res.status(200).json({
      message: "All complaints fetched successfully",
      success: true,
      complaints,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Cannot fetch complaints",
      success: false,
      error: error.message,
    });
  }
};

const getComplaintById = async (req, res) => {
  try {
    const { id } = req.params;
    const complaint = await ComplaintModel.findById(id);
    if (!complaint) {
      return res.status(404).json({
        message: "Complaint not found",
        success: false,
      });
    }
    return res.status(200).json({
      message: "Complaint fetched successfully",
      success: true,
      complaint,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Cannot fetch complaint",
      success: false,
      error: error.message,
    });
  }
};

module.exports = {
  getAllComplaints,
  getComplaintById,
};

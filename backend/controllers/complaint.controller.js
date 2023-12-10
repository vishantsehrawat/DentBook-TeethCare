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

const createComplaint = async (req, res) => {
  try {
    const newComplaint = new ComplaintModel(req.body);
    const savedComplaint = await newComplaint.save();

    return res.status(200).json({
      message: "Complaint created successfully",
      success: true,
      complaint: savedComplaint,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Cannot create complaint",
      success: false,
      error: error.message,
    });
  }
};

const updateComplaint = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedComplaint = await ComplaintModel.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
      }
    );

    if (!updatedComplaint) {
      return res.status(404).json({
        message: "Complaint not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Complaint updated successfully",
      success: true,
      complaint: updatedComplaint,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Cannot update complaint",
      success: false,
      error: error.message,
    });
  }
};

const deleteComplaint = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedComplaint = await ComplaintModel.findByIdAndDelete(id);

    if (!deletedComplaint) {
      return res.status(404).json({
        message: "Complaint not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Complaint deleted successfully",
      success: true,
      complaint: deletedComplaint,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Cannot delete complaint",
      success: false,
      error: error.message,
    });
  }
};
const getComplaintsByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const complaints = await ComplaintModel.find({ userId });

    return res.status(200).json({
      message: "Complaints fetched by user successfully",
      success: true,
      complaints,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Cannot fetch complaints by user",
      success: false,
      error: error.message,
    });
  }
};

const getComplaintsByStatus = async (req, res) => {
  try {
    const { status } = req.params;
    const complaints = await ComplaintModel.find({ status });

    return res.status(200).json({
      message: `Complaints fetched by status  successfully`,
      success: true,
      complaints,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Cannot fetch complaints by status",
      success: false,
      error: error.message,
    });
  }
};

const resolveComplaint = async (req, res) => {
  try {
    const { id } = req.params;
    const resolvedComplaint = await ComplaintModel.findByIdAndUpdate(
      id,
      { status: "Resolved", closingDate: Date.now() },
      { new: true }
    );

    if (!resolvedComplaint) {
      return res.status(404).json({
        message: "Complaint not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Complaint resolved successfully",
      success: true,
      complaint: resolvedComplaint,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Cannot resolve complaint",
      success: false,
      error: error.message,
    });
  }
};


const getHighSeverityComplaints = async (req, res) => {
  try {
    const highSeverityComplaints = await ComplaintModel.find({
      severity: "High",
    });
    return res.status(200).json({
      message: "High severity complaints fetched successfully",
      success: true,
      complaints: highSeverityComplaints,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Cannot fetch high severity complaints",
      success: false,
      error: error.message,
    });
  }
};

const getResolvedComplaints = async (req, res) => {
  try {
    const resolvedComplaints = await ComplaintModel.find({
      status: "Resolved",
    });
    return res.status(200).json({
      message: "Resolved complaints fetched successfully",
      success: true,
      complaints: resolvedComplaints,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Cannot fetch resolved complaints",
      success: false,
      error: error.message,
    });
  }
};


  module.exports = {
    createComplaint,
    updateComplaint,
    deleteComplaint,
    getComplaintsByUser,
    getComplaintsByStatus,
    resolveComplaint,
    getAllComplaints,
    getComplaintById,
    getHighSeverityComplaints,
    getResolvedComplaints,
  };
};

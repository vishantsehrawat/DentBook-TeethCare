const { ClinicModel } = require("../models/clinic.model");

const createClinic = async (req, res) => {
  try {
    const newClinic = new ClinicModel(req.body);
    await newClinic.save();

    return res.status(201).json({
      message: "Clinic created successfully",
      success: true,
      clinic: newClinic,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Cannot create clinic",
      success: false,
      error: error.message,
    });
  }
};

const getClinicById = async (req, res) => {
  try {
    const { id } = req.params;
    const clinic = await ClinicModel.findById(id);
    if (!clinic) {
      return res.status(404).json({
        message: "Clinic not found",
        success: false,
      });
    }
    return res.status(200).json({
      message: "Clinic fetched successfully",
      success: true,
      clinic,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Cannot fetch clinic",
      success: false,
      error: error.message,
    });
  }
};

const updateClinic = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedClinic = await ClinicModel.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedClinic) {
      return res.status(404).json({
        message: "Clinic not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Clinic updated successfully",
      success: true,
      clinic: updatedClinic,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Cannot update clinic",
      success: false,
      error: error.message,
    });
  }
};

const deleteClinic = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedClinic = await ClinicModel.findByIdAndDelete(id);

    if (!deletedClinic) {
      return res.status(404).json({
        message: "Clinic not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Clinic deleted successfully",
      success: true,
      clinic: deletedClinic,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Cannot delete clinic",
      success: false,
      error: error.message,
    });
  }
};

const getAllClinics = async (req, res) => {
  try {
    const clinics = await ClinicModel.find();
    return res.status(200).json({
      message: "All clinics fetched successfully",
      success: true,
      clinics,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Cannot fetch clinics",
      success: false,
      error: error.message,
    });
  }
};

module.exports = {
  createClinic,
  getClinicById,
  updateClinic,
  deleteClinic,
  getAllClinics,
  getClinicsByService,
  getClinicsByRating,
  addReviewToClinic,
  getClinicsByDentist,
};

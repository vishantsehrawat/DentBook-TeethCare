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

const getClinicsByService = async (req, res) => {
  try {
    const { service } = req.params;
    const clinics = await ClinicModel.find({ servicesOffered: service });

    return res.status(200).json({
      message: `Clinics offering ${service} fetched successfully`,
      success: true,
      clinics,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Cannot fetch clinics by service",
      success: false,
      error: error.message,
    });
  }
};

const getClinicsByRating = async (req, res) => {
  try {
    const { rating } = req.params;
    const clinics = await ClinicModel.find({ "ratings.overall": rating });

    return res.status(200).json({
      message: `Clinics with rating ${rating} fetched successfully`,
      success: true,
      clinics,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Cannot fetch clinics by rating",
      success: false,
      error: error.message,
    });
  }
};

const addReviewToClinic = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId, rating, comment } = req.body;

    const clinic = await ClinicModel.findById(id);
    if (!clinic) {
      return res.status(404).json({
        message: "Clinic not found",
        success: false,
      });
    }

    clinic.reviews.push({ userId, rating, comment });
    await clinic.save();

    return res.status(200).json({
      message: "Review added to clinic successfully",
      success: true,
      clinic,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Cannot add review to clinic",
      success: false,
      error: error.message,
    });
  }
};
const getClinicsByDentist = async (req, res) => {
  try {
    const { dentistId } = req.params;
    const clinics = await ClinicModel.find({ dentists: dentistId });

    return res.status(200).json({
      message: `Clinics associated with Dentist ID: ${dentistId} fetched successfully`,
      success: true,
      clinics,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Cannot fetch clinics by dentist",
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

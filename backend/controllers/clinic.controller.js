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

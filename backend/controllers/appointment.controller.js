const { AppointmentModel } = require("../models/appointment.model");

const createAppointment = async (req, res) => {
  const appointmentData = req.body;

  try {
    const appointment = new AppointmentModel(appointmentData);
    await appointment.save();
    return res.status(200).json({
      message: "Appointment created successfully",
      success: true,
      appointment: appointment,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "Cannot create appointment",
      success: false,
      error: error.message,
    });
  }
};

const getAllAppointments = async (req, res) => {
  try {
    const appointments = await AppointmentModel.find();
    return res.status(200).json({
      message: "All appointments fetched successfully",
      success: true,
      appointments: appointments,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Cannot fetch appointments",
      success: false,
      error: error.message,
    });
  }
};
const getAppointmentById = async (req, res) => {
  const appointmentId = req.params.appointmentId;

  try {
    const appointment = await AppointmentModel.findById(appointmentId);
    if (!appointment) {
      return res.status(404).json({
        message: "Appointment not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Appointment found successfully",
      success: true,
      appointment: appointment,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Cannot fetch appointment",
      success: false,
      error: error.message,
    });
  }
};

module.exports = {
  createAppointment,
  getAllAppointments,
  getAppointmentById,
  updateAppointment,
  deleteAppointment,
  getAppointmentsByUser,
  getAppointmentsByDentist,
  updateAppointmentStatus,
  searchAppointments,
  getUpcomingAppointments,
};

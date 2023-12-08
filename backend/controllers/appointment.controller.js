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

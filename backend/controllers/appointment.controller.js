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

async function updateAppointment(req, res) {
  try {
    const { appointmentId } = req.params;
    const updatedData = req.body;

    const appointment = await AppointmentModel.findByIdAndUpdate(
      appointmentId,
      updatedData,
      { new: true }
    );

    if (!appointment) {
      return res
        .status(404)
        .json({ message: "Appointment not found", success: false });
    }

    return res.status(200).json({
      message: "Appointment updated successfully",
      success: true,
      appointment,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Failed to update appointment",
      success: false,
      error: error.message,
    });
  }
}

async function deleteAppointment(req, res) {
  try {
    const { appointmentId } = req.params;

    const deletedAppointment = await AppointmentModel.findByIdAndDelete(
      appointmentId
    );

    if (!deletedAppointment) {
      return res
        .status(404)
        .json({ message: "Appointment not found", success: false });
    }

    return res
      .status(200)
      .json({ message: "Appointment deleted successfully", success: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Failed to delete appointment",
      success: false,
      error: error.message,
    });
  }
}

async function getAppointmentsByUser(req, res) {
  try {
    const { userId } = req.params;

    const userAppointments = await AppointmentModel.find({ userId });

    return res
      .status(200)
      .json({ appointments: userAppointments, success: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Failed to fetch user appointments",
      success: false,
      error: error.message,
    });
  }
}
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

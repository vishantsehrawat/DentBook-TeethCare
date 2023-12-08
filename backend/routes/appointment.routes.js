const express = require("express");
const {
  getAllAppointments,
  getAppointmentById,
  updateAppointment,
  getAppointmentsByUser,
  deleteAppointment,
  getAppointmentsByDentist,
  updateAppointmentStatus,
  searchAppointments,
  getUpcomingAppointments,
  createAppointment,
} = require("../controllers/appointment.controller");

const appointmentRouter = express.Router();

appointmentRouter.post("/", createAppointment);

appointmentRouter.get("/", getAllAppointments);

appointmentRouter.get("/:appointmentId", getAppointmentById);

appointmentRouter.put("/:appointmentId", updateAppointment);

appointmentRouter.delete("/:appointmentId", deleteAppointment);

appointmentRouter.get("/user/:userId", getAppointmentsByUser);

appointmentRouter.get("/dentist/:dentistId", getAppointmentsByDentist);

appointmentRouter.put("/:appointmentId/status", updateAppointmentStatus);

appointmentRouter.get("/search", searchAppointments);

appointmentRouter.get("/upcoming", getUpcomingAppointments);

module.exports = { appointmentRouter };

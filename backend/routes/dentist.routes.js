const express = require("express");
const dentistRouter = express.Router();

const { authMiddleware } = require("../middlewares/authMiddleware");
const {
  registerDentist,
  dentistLogin,
  updateDentistDetails,
  getAllDentists,
  getDentistById,
  deleteDentistById,
  updateDentistPassword,
  getDentistAppointments,
  setDentistAvailability,
} = require("../controllers/dentist.controller");

require("dotenv").config();

dentistRouter.post("/login", dentistLogin);

dentistRouter.post("/register", registerDentist);

dentistRouter.patch("/update/:id", authMiddleware, updateDentistDetails);

dentistRouter.get("/get", getAllDentists);

dentistRouter.get("/:id", authMiddleware, getDentistById);

dentistRouter.delete("/:id", authMiddleware, deleteDentistById);

dentistRouter.patch(
  "/updatePassword/:id",
  authMiddleware,
  updateDentistPassword
);

dentistRouter.get("/:id/appointments", authMiddleware, getDentistAppointments);

dentistRouter.patch(
  "/:id/availability",
  authMiddleware,
  setDentistAvailability
);

module.exports = {
  dentistRouter,
};

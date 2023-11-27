const express = require("express");
const dentistRouter = express.Router();

const { authMiddleware } = require("../middlewares/authMiddleware");
const {
  registerDentist,
  dentistLogin,
  dentistLogout,
  generateNewToken,
  updateDentistDetails,
  getAllDentists,
  forgotPassword,
  getDentistById,
  deleteDentistById,
  updateDentistPassword,
  getDentistAppointments,
  setDentistAvailability,
} = require("../controllers/dentist.controller");

require("dotenv").config();

dentistRouter.post("/login", dentistLogin);

dentistRouter.post("/register", registerDentist);

dentistRouter.get("/newtoken", authMiddleware, generateNewToken);

dentistRouter.patch("/update/:id", authMiddleware, updateDentistDetails);

dentistRouter.get("/get", getAllDentists);

dentistRouter.get("/forgotPassword", authMiddleware, forgotPassword);

dentistRouter.post("/logout", authMiddleware, dentistLogout);

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

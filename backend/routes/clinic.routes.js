const express = require("express");
const clinicRouter = express.Router();
const {
  createClinic,
  getClinicById,
  updateClinic,
  getAllClinics,
} = require("../controllers/clinic.controller");

clinicRouter.post("/", createClinic);

clinicRouter.get("/", getAllClinics);

clinicRouter.get("/:id", getClinicById);

clinicRouter.put("/:id", updateClinic);


module.exports = { clinicRouter };

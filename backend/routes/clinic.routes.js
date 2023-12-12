const express = require("express");
const clinicRouter = express.Router();
const {
  createClinic,
  getClinicById,
  updateClinic,
  deleteClinic,
  getAllClinics,
  getClinicsByService,
  getClinicsByRating,
  addReviewToClinic,
  getClinicsByDentist,
} = require("../controllers/clinic.controller");

clinicRouter.post("/", createClinic);

clinicRouter.get("/", getAllClinics);

clinicRouter.get("/:id", getClinicById);

clinicRouter.put("/:id", updateClinic);

clinicRouter.put("/:id/addReview", addReviewToClinic);

clinicRouter.delete("/:id", deleteClinic);

clinicRouter.get("/service/:service", getClinicsByService);

clinicRouter.get("/dentist/:dentistId", getClinicsByDentist);

clinicRouter.get("/rating/:rating", getClinicsByRating);

module.exports = { clinicRouter };

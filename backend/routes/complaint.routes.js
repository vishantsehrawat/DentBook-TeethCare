const express = require("express");
const complaintRouter = express.Router();
const {
  createComplaint,
  getComplaintById,
  updateComplaint,
  deleteComplaint,
  getAllComplaints,
  getComplaintsByUser,
  getComplaintsByStatus,
  resolveComplaint,
} = require("../controllers/complaintController");

complaintRouter.post("/", createComplaint);

complaintRouter.get("/", getAllComplaints);

complaintRouter.get("/:id", getComplaintById);



module.exports = { complaintRouter };

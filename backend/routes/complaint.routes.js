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

complaintRouter.put("/:id", updateComplaint);

complaintRouter.delete("/:id", deleteComplaint);

complaintRouter.get("/user/:userId", getComplaintsByUser);

complaintRouter.get("/status/:status", getComplaintsByStatus);

complaintRouter.put("/:id/resolve", resolveComplaint);

module.exports = { complaintRouter };

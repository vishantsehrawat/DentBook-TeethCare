const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  complaintType: {
    type: String,
    enum: [
      "Staff",
      "Hospital Service",
      "Appointment",
      "Facilities",
      "Cleanliness",
      "Billing",
      "Waiting Time",
      "Communication",
      "Treatment Quality",
      "Privacy Concerns",
      "Equipment",
      "Medication",
      "Accessibility",
      "Discharge Process",
      "Other",
    ],
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["Pending", "In Progress", "Resolved"],
    default: "Pending",
  },
  severity: {
    type: String,
    enum: ["Low", "Medium", "High"],
    default: "Low",
  },
  images: [String], // Array of image URLs
  closingDate: {
    type: Date,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const ComplaintModel = mongoose.model("complaint", complaintSchema);

module.exports = { ComplaintModel };

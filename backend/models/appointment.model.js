const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
  {
    dentistId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Dentist",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    appointmentDate: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["scheduled", "cancelled", "completed"],
      default: "scheduled",
    },
    appointmentType: {
      type: String,
      enum: ["consultation", "treatment", "check-up"],
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    location: {
      address: {
        type: String,
        required: true,
      },
      city: String,
      state: String,
      country: String,
      postalCode: String,
    },
    notes: {
      type: String,
      maxlength: 500,
    },
    reminders: [
      {
        notificationType: {
          type: String,
          enum: ["sms", "email", "push"],
          required: true,
        },
        scheduledTime: {
          type: Date,
          required: true,
        },
        sent: {
          type: Boolean,
          default: false,
        },
      },
    ],
    procedure: {
      type: String,
      enum: [
        "Teeth Cleaning",
        "Fillings",
        "Root Canal Therapy",
        "Tooth Extraction",
        "Dental Implants",
        "other",
      ],
    },

    medicalHistory: {
      allergies: [String],
      medications: [String],
    },
    paymentInfo: {
      amount: Number,
      method: {
        type: String,
        enum: ["credit card", "cash", "insurance", "online payment"],
      },
    },
  },
  { timestamps: true }
);

const AppointmentModel = mongoose.model("appointment", appointmentSchema);

module.exports = { AppointmentModel };

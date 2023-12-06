const mongoose = require("mongoose");

const clinicSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    address: {
      street: String,
      city: String,
      state: String,
      country: String,
      postalCode: String,
    },
    contact: {
      phone: String,
      email: {
        type: String,
        required: true,
      },
      website: String,
      socialMedia: {
        facebook: String,
        twitter: String,
        instagram: String,
      },
    },
    servicesOffered: {
      type: [String],
      enum: [
        "Teeth Cleaning",
        "Fillings",
        "Root Canal Therapy",
        "Tooth Extraction",
        "Dental Implants",
        "other"
      ],
    },
    dentists: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Dentist",
      },
    ],
    facilities: {
      diagnostic: [String],
      medicalEquipment: [String],
    },
    workingHours: {
      monday: { type: String, default: "Closed" },
      tuesday: { type: String, default: "Closed" },
      wednesday: { type: String, default: "Closed" },
      thursday: { type: String, default: "Closed" },
      friday: { type: String, default: "Closed" },
      saturday: { type: String, default: "Closed" },
      sunday: { type: String, default: "Closed" },
    },
    ratings: {
      overall: Number,
      cleanliness: Number,
      facilities: Number,
    },
    reviews: [
      {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
        rating: Number,
        comment: String,
        timestamp: { type: Date, default: Date.now },
      },
    ],
    images: [String],
    additionalInfo: {
      accreditation: String,
      awards: [String],
    },
  },
  { timestamps: true }
);

const ClinicModel = mongoose.model("clinic", clinicSchema);

module.exports = { ClinicModel };

const mongoose = require("mongoose");

const dentistSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: mongoose.SchemaTypes.Email, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    gender: { type: String, enum: ["male", "female", "other"] },
    dateOfBirth: { type: Date },

    practiceName: { type: String, required: true },
    registrationNumber: { type: String, required: true, unique: true },
    specialization: {
      type: [
        {
          type: String,
          enum: [
            "General Dentistry",
            "Orthodontics",
            "Endodontics",
            "Periodontics",
            "Oral and Maxillofacial Surgery",
            "Prosthodontics",
            "Pediatric Dentistry",
            "Dental Public Health",
            "Oral Pathology",
            "Oral Radiology",
            "Cosmetic Dentistry",
            "others",
          ],
        },
      ],
      required: true,
    },
    unmentionedSpecialization: { type: String },
    experienceYears: { type: Number },
    education: [
      {
        institution: { type: String },
        degree: { type: String },
        yearCompleted: { type: String },
      },
    ],

    location: {
      street: { type: String },
      city: { type: String },
      state: { type: String },
      country: { type: String },
      zipCode: { type: String },
    },

    servicesOffered: {
      type: [
        {
          type: String,
          enum: [
            "Teeth Cleaning",
            "Fillings",
            "Root Canal Therapy",
            "Tooth Extraction",
            "Dental Implants",
            "Orthodontic Treatments",
            "Cosmetic Dentistry",
            "others",
          ],
        },
      ],
      unmentionedServiceOffered: { type: String },
    },
    workingHours: {
      from: { type: String },
      to: { type: String },
    },
    appointmentHistory: [
      {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        appointmentDate: { type: Date },
        procedureBooked: { type: String },
        feedback: { type: String },
        isCancelled: { type: Boolean, default: false },
      },
    ],

    reviews: [
      {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        rating: { type: Number },
        comment: { type: String },
        timestamp: { type: Date },
      },
    ],

    images: [{ imageUrl: { type: String } }],
    isVerified: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
  },
  { versionKey: false, timestamps: true }
);

const DentistModel = mongoose.model("Dentist", dentistSchema);

module.exports = { DentistModel };

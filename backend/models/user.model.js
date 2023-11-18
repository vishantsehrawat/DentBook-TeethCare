const mongoose = require("mongoose");
require("mongoose-type-email");

const dentalUserSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: mongoose.SchemaTypes.Email, required: true, unique: true },
    password: { type: String, required: true },
    dateOfBirth: { type: Date },
    gender: { type: String, enum: ["male", "female", "other"] },
    nationality: { type: String },
    phone: { type: String },
    userUid: { type: String, unique: true },

    address: {
      street: { type: String },
      city: { type: String },
      state: { type: String },
      country: { type: String },
      zipCode: { type: String },
    },

    medicalHistory: {
      allergies: [{ type: String }],
      medications: [{ type: String }],
      comments: { type: String },
    },

    notificationSettings: {
      email: { type: Boolean, default: true },
      sms: { type: Boolean, default: false },
      pushNotifications: { type: Boolean, default: true },
    },

    lastLogin: {
      timestamp: { type: Date },
      ipAddress: { type: String },
    },

    role: { type: String, enum: ["user", "admin"], default: "user" }, // not much useful here but still can be used differently

    isAccountEmailVerified: { type: Boolean, default: false }, // email verification
    isActive: { type: Boolean, default: true },
    passwordResetToken: { type: String },
    otpEmail: {
      code: { type: String },
      expiration: { type: Date },
      attempts: { type: Number, default: 0 },
      maxAttempts: { type: Number, default: 3 },
      lastAttempt: { type: Date },
      used: { type: Boolean, default: false },
    },

    isTwoFactorAuthEnabled: { type: Boolean, default: false },

    privacySettings: {
      visibleEmail: { type: Boolean, default: true },
      visiblePhone: { type: Boolean, default: true },
    },

    preferredContactTime: {
      morning: { type: Boolean, default: false },
      afternoon: { type: Boolean, default: false },
      evening: { type: Boolean, default: false },
      night: { type: Boolean, default: false },
      lateNight: { type: Boolean, default: false },
    },

    // Dental Booking Specific Fields
    dentalHistory: {
      lastDentalVisit: { type: Date },
      issues: [{ type: String }],
      treatmentPlan: { type: String },
    },

    lastDentalAppointment: {
      timestamp: { type: Date },
      dentistId: { type: mongoose.Schema.Types.ObjectId, ref: "dentist" },
      procedureDone: { type: String },
      feedback: { type: String },
    },
  },
  { versionKey: false, timestamps: true }
);

const DentalUserModel = mongoose.model("dentalUser", dentalUserSchema);

module.exports = { DentalUserModel };

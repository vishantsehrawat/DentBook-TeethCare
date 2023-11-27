const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const { DentistModel } = require("../models/dentist.model");

const registerDentist = async (req, res) => {
  const dentistData = req.body;

  try {
    const { email } = dentistData;
    let alreadyPresent = await DentistModel.findOne({ email });

    if (alreadyPresent) {
      return res.status(400).json({
        message: "Dentist is already registered. Please use a different email.",
        success: false,
      });
    } else {
      const hash = bcrypt.hashSync(dentistData.password, 4);
      dentistData.password = hash;
      dentistData.userUid = uuidv4();
      const dentist = new DentistModel(dentistData);
      await dentist.save();
      return res
        .status(200)
        .json({ message: "New dentist added", success: true });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "Cannot add new dentist",
      success: false,
      error: error.message,
    });
  }
};

const dentistLogin = async (req, res) => {
  const dentist = req.body;

  try {
    const myDentist = await DentistModel.findOne({ email: dentist.email });
    if (myDentist) {
      bcrypt.compare(
        dentist.password,
        myDentist.password,
        function (err, result) {
          if (err || !result) {
            return res.status(400).json({
              message: "Invalid credentials",
              success: false,
            });
          }

          var token = jwt.sign(
            { userId: myDentist._id },
            process.env.TOKEN_SECRET,
            {
              expiresIn: "7d",
            }
          );
          var refreshToken = jwt.sign(
            { userId: myDentist._id },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: "24d" }
          );
          return res.status(200).json({
            message: "Dentist logged in",
            token,
            refreshToken,
            userId: myDentist._id,
            success: true,
          });
        }
      );
    } else {
      return res
        .status(400)
        .json({ message: "Dentist not found", success: false });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: error.message || "Error logging in",
      success: false,
    });
  }
};

module.exports = {
  registerDentist,
  dentistLogin,
  getDentistById,
  deleteDentistById,
  updateDentistPassword,
  getDentistAppointments,
  setDentistAvailability,
  updateDentistDetails,
  getAllDentists,
};

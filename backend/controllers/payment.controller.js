const { PaymentModel } = require("../models/payment.model");

const createPayment = async (req, res) => {
  try {
    const newPayment = new PaymentModel(req.body);
    await newPayment.save();

    return res.status(201).json({
      message: "Payment created successfully",
      success: true,
      payment: newPayment,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Cannot create payment",
      success: false,
      error: error.message,
    });
  }
};

const getAllPayments = async (req, res) => {
  try {
    const payments = await PaymentModel.find();
    return res.status(200).json({
      message: "All payments fetched successfully",
      success: true,
      payments,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Cannot fetch payments",
      success: false,
      error: error.message,
    });
  }
};

const getPaymentById = async (req, res) => {
  try {
    const { id } = req.params;
    const payment = await PaymentModel.findById(id);
    if (!payment) {
      return res.status(404).json({
        message: "Payment not found",
        success: false,
      });
    }
    return res.status(200).json({
      message: "Payment fetched successfully",
      success: true,
      payment,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Cannot fetch payment",
      success: false,
      error: error.message,
    });
  }
};
module.exports = {
  createPayment,
  getAllPayments,
  getPaymentById,
  updatePayment,
  deletePayment,
  getPaymentsByUser,
  getPaymentsByStatus,
};

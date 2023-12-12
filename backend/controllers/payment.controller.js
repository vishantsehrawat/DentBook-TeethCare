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

module.exports = {
  createPayment,
  getAllPayments,
  getPaymentById,
  updatePayment,
  deletePayment,
  getPaymentsByUser,
  getPaymentsByStatus,
};

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

const updatePayment = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedPayment = await PaymentModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedPayment) {
      return res.status(404).json({
        message: "Payment not found",
        success: false,
      });
    }
    return res.status(200).json({
      message: "Payment updated successfully",
      success: true,
      payment: updatedPayment,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Cannot update payment",
      success: false,
      error: error.message,
    });
  }
};

const deletePayment = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedPayment = await PaymentModel.findByIdAndDelete(id);
    if (!deletedPayment) {
      return res.status(404).json({
        message: "Payment not found",
        success: false,
      });
    }
    return res.status(200).json({
      message: "Payment deleted successfully",
      success: true,
      payment: deletedPayment,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Cannot delete payment",
      success: false,
      error: error.message,
    });
  }
};

const getPaymentsByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const payments = await PaymentModel.find({ userId });
    return res.status(200).json({
      message: "Payments fetched by user successfully",
      success: true,
      payments,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Cannot fetch payments by user",
      success: false,
      error: error.message,
    });
  }
};

const getPaymentsByStatus = async (req, res) => {
  try {
    const { status } = req.params;
    const payments = await PaymentModel.find({ status });
    return res.status(200).json({
      message: "Payments fetched by status successfully",
      success: true,
      payments,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Cannot fetch payments by status",
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

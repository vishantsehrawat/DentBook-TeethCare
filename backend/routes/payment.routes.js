const express = require("express");
const paymentRouter = express.Router();
const {
  createPayment,
  getPaymentById,
  updatePayment,
  deletePayment,
  getAllPayments,
  getPaymentsByUser,
  getPaymentsByStatus,
} = require("../controllers/paymentController");

paymentRouter.post("/", createPayment);

paymentRouter.get("/", getAllPayments);

paymentRouter.get("/:id", getPaymentById);

paymentRouter.put("/:id", updatePayment);

paymentRouter.delete("/:id", deletePayment);

paymentRouter.get("/user/:userId", getPaymentsByUser);

paymentRouter.get("/status/:status", getPaymentsByStatus);

module.exports = { paymentRouter };

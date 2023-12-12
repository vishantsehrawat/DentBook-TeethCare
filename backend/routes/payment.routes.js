const express = require("express");
const paymentRouter = express.Router();
const {
  createPayment,
  getPaymentById,
  deletePayment,
  getAllPayments,
} = require("../controllers/paymentController");

paymentRouter.post("/", createPayment);

paymentRouter.get("/", getAllPayments);

paymentRouter.get("/:id", getPaymentById);

paymentRouter.delete("/:id", deletePayment);

module.exports = { paymentRouter };

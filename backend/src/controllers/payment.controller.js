import { createPaymentIntent, verifyPayment } from "../services/payment.service.js";

export async function paymentIntentController(req, res) {
  const intent = await createPaymentIntent(req.body.orderId, req.body.provider || "stripe");
  res.json(intent);
}

export async function paymentVerifyController(req, res) {
  const result = await verifyPayment(req.body.orderId, req.body.paymentRef, req.body.success);
  res.json(result);
}

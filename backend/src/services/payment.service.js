import { prisma } from "../lib/prisma.js";

export async function createPaymentIntent(orderId, provider = "stripe") {
  const order = await prisma.order.findUnique({ where: { id: orderId } });
  if (!order) throw new Error("Sipariş bulunamadı");

  return {
    orderId,
    clientSecret: `mock_${provider}_secret_${orderId}`,
    amount: order.totalPrice,
    currency: "TRY"
  };
}

export async function verifyPayment(orderId, paymentRef, success) {
  const paymentStatus = success ? "SUCCESS" : "FAILED";
  const status = success ? "PAID" : "PENDING";

  return prisma.order.update({
    where: { id: orderId },
    data: { paymentStatus, status, paymentRef }
  });
}

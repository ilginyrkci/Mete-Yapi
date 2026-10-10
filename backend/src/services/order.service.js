import { prisma } from "../lib/prisma.js";
import { ApiError } from "../utils/api-error.js";

export async function createOrder(userId, items) {
  return prisma.$transaction(async (tx) => {
    let totalPrice = 0;
    const orderItemsData = [];

    for (const item of items) {
      const product = await tx.product.findUnique({ where: { id: item.productId } });
      if (!product) throw new ApiError(404, `Ürün bulunamadı: ${item.productId}`);
      if (product.stock < item.quantity) {
        throw new ApiError(400, `Stok yetersiz: ${product.title}`);
      }

      const itemTotal = Number(product.price) * item.quantity;
      totalPrice += itemTotal;

      orderItemsData.push({
        productId: item.productId,
        quantity: item.quantity,
        price: product.price
      });

      const oldStock = product.stock;
      const newStock = oldStock - item.quantity;

      await tx.product.update({
        where: { id: item.productId },
        data: { stock: newStock }
      });

      await tx.stockLog.create({
        data: {
          productId: item.productId,
          oldStock,
          newStock,
          reason: "ORDER_CREATED",
          changedBy: userId
        }
      });
    }

    const order = await tx.order.create({
      data: {
        userId,
        totalPrice,
        status: "PENDING",
        paymentStatus: "PENDING",
        items: { create: orderItemsData }
      },
      include: { items: { include: { product: true } } }
    });

    return order;
  });
}

export async function getUserOrders(userId, role) {
  const where = role === "ADMIN" || role === "EMPLOYEE" ? {} : { userId };
  return prisma.order.findMany({
    where,
    include: { items: { include: { product: true } }, user: { select: { name: true, email: true } } },
    orderBy: { createdAt: "desc" }
  });
}

export async function updateOrderStatus(orderId, status) {
  return prisma.order.update({
    where: { id: orderId },
    data: { status }
  });
}

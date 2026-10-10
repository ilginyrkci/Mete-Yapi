import { prisma } from "../lib/prisma.js";

export async function getDashboardStats() {
  const [totalProducts, totalOrders, totalUsers, totalRevenue] = await Promise.all([
    prisma.product.count(),
    prisma.order.count(),
    prisma.user.count(),
    prisma.order.aggregate({
      where: { paymentStatus: "SUCCESS" },
      _sum: { totalPrice: true }
    })
  ]);

  return {
    totalProducts,
    totalOrders,
    totalUsers,
    totalRevenue: totalRevenue._sum.totalPrice || 0
  };
}

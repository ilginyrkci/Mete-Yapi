import { prisma } from "../lib/prisma.js";
import { ApiError } from "../utils/api-error.js";

export async function updateStock(productId, newStock, changedBy) {
  const product = await prisma.product.findUnique({ where: { id: productId } });
  if (!product) throw new ApiError(404, "Ürün bulunamadı");

  const oldStock = product.stock;

  const [updatedProduct] = await prisma.$transaction([
    prisma.product.update({
      where: { id: productId },
      data: { stock: newStock }
    }),
    prisma.stockLog.create({
      data: {
        productId,
        oldStock,
        newStock,
        reason: "MANUAL_UPDATE",
        changedBy
      }
    })
  ]);

  return updatedProduct;
}

export async function getStockLogs(productId) {
  const where = productId ? { productId } : {};
  return prisma.stockLog.findMany({
    where,
    include: { product: true, user: { select: { name: true, email: true } } },
    orderBy: { createdAt: "desc" }
  });
}

export async function getLowStockItems(threshold = 10) {
  return prisma.product.findMany({
    where: { stock: { lte: threshold } },
    include: { category: true }
  });
}

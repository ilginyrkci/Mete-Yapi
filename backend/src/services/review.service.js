import { prisma } from "../lib/prisma.js";

export async function addReview(userId, productId, { rating, comment }) {
  return prisma.review.upsert({
    where: { userId_productId: { userId, productId } },
    update: { rating, comment },
    create: { userId, productId, rating, comment }
  });
}

export async function getProductReviews(productId) {
  return prisma.review.findMany({
    where: { productId },
    include: { user: { select: { name: true } } },
    orderBy: { createdAt: "desc" }
  });
}

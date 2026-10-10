import { prisma } from "../lib/prisma.js";

export async function toggleFavorite(userId, productId) {
  const existing = await prisma.favorite.findUnique({
    where: { userId_productId: { userId, productId } }
  });

  if (existing) {
    await prisma.favorite.delete({
      where: { userId_productId: { userId, productId } }
    });
    return { favorited: false };
  } else {
    await prisma.favorite.create({
      data: { userId, productId }
    });
    return { favorited: true };
  }
}

export async function listFavorites(userId) {
  return prisma.favorite.findMany({
    where: { userId },
    include: { product: { include: { category: true } } }
  });
}

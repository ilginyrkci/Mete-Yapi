import { prisma } from "../lib/prisma.js";
import { ApiError } from "../utils/api-error.js";
import { uploadImage } from "./upload.service.js";
import slugify from "slugify";

function makeSlug(text) {
  return slugify(text, { lower: true, strict: true, locale: "tr" });
}

export async function listProducts({ categoryId, search, minPrice, maxPrice, page = 1, limit = 12 }) {
  const where = {};
  if (categoryId) where.categoryId = categoryId;
  if (search) where.title = { contains: search };
  if (minPrice || maxPrice) {
    where.price = {};
    if (minPrice) where.price.gte = Number(minPrice);
    if (maxPrice) where.price.lte = Number(maxPrice);
  }

  const skip = (Number(page) - 1) * Number(limit);
  const [products, total] = await Promise.all([
    prisma.product.findMany({
      where,
      include: { category: true, images: true },
      skip,
      take: Number(limit),
      orderBy: { createdAt: "desc" }
    }),
    prisma.product.count({ where })
  ]);

  return { products, total, page: Number(page), totalPages: Math.ceil(total / Number(limit)) };
}

export async function getProductById(id) {
  const product = await prisma.product.findUnique({
    where: { id },
    include: { category: true, images: true, reviews: { include: { user: { select: { name: true } } } } }
  });
  if (!product) throw new ApiError(404, "Ürün bulunamadı");
  return product;
}

export async function createProduct(data) {
  const slug = makeSlug(data.title) + "-" + Date.now();
  return prisma.product.create({
    data: { ...data, slug },
    include: { category: true, images: true }
  });
}

export async function updateProduct(id, data) {
  const updateData = { ...data };
  if (data.title) updateData.slug = makeSlug(data.title) + "-" + Date.now();
  return prisma.product.update({
    where: { id },
    data: updateData,
    include: { category: true, images: true }
  });
}

export async function deleteProduct(id) {
  return prisma.product.delete({ where: { id } });
}

export async function addProductImages(productId, files) {
  if (!files || files.length === 0) return [];
  const uploads = await Promise.all(files.map(f => uploadImage(f.buffer, "products")));
  const created = await Promise.all(
    uploads.map((img, idx) =>
      prisma.productImage.create({
        data: { productId, url: img.url, publicId: img.publicId, sortOrder: idx }
      })
    )
  );
  return created;
}

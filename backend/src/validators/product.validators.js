import { z } from "zod";

export const createProductSchema = z.object({
  title: z.string().min(2).max(160),
  description: z.string().min(5),
  price: z.number().positive(),
  stock: z.number().int().nonnegative(),
  categoryId: z.string().min(1),
  image: z.string().url().optional()
});

export const updateProductSchema = createProductSchema.partial();

import { z } from "zod";

export const updateStockSchema = z.object({
  stock: z.number().int().nonnegative()
});

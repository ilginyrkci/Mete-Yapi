import { Router } from "express";
import { getProductsController, getProductController, createProductController, updateProductController, deleteProductController, uploadImagesController } from "../controllers/product.controller.js";
import { validate } from "../middlewares/validate.middleware.js";
import { createProductSchema, updateProductSchema } from "../validators/product.validators.js";
import { idParamSchema } from "../validators/common.validators.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { authorize } from "../middlewares/role.middleware.js";
import { upload } from "../middlewares/upload.middleware.js";
import { asyncHandler } from "../utils/async-handler.js";

export const productRouter = Router();

productRouter.get("/", asyncHandler(getProductsController));
productRouter.get("/categories/list", asyncHandler(async (req, res) => {
  const { prisma } = await import("../lib/prisma.js");
  const categories = await prisma.category.findMany({ orderBy: { name: "asc" } });
  res.json(categories);
}));
productRouter.get("/:id", validate({ params: idParamSchema }), asyncHandler(getProductController));

productRouter.post("/", authenticate, authorize("ADMIN", "EMPLOYEE"), validate({ body: createProductSchema }), asyncHandler(createProductController));
productRouter.put("/:id", authenticate, authorize("ADMIN", "EMPLOYEE"), validate({ params: idParamSchema, body: updateProductSchema }), asyncHandler(updateProductController));
productRouter.delete("/:id", authenticate, authorize("ADMIN"), validate({ params: idParamSchema }), asyncHandler(deleteProductController));
productRouter.post("/:id/images", authenticate, authorize("ADMIN", "EMPLOYEE"), validate({ params: idParamSchema }), upload.array("images", 5), asyncHandler(uploadImagesController));

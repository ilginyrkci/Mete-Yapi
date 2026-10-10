import { Router } from "express";
import { createOrderController, getOrdersController, updateOrderStatusController } from "../controllers/order.controller.js";
import { validate } from "../middlewares/validate.middleware.js";
import { createOrderSchema, updateOrderStatusSchema } from "../validators/order.validators.js";
import { idParamSchema } from "../validators/common.validators.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { authorize } from "../middlewares/role.middleware.js";
import { asyncHandler } from "../utils/async-handler.js";

export const orderRouter = Router();

orderRouter.use(authenticate);
orderRouter.post("/", validate({ body: createOrderSchema }), asyncHandler(createOrderController));
orderRouter.get("/", asyncHandler(getOrdersController));
orderRouter.patch("/:id", authorize("ADMIN", "EMPLOYEE"), validate({ params: idParamSchema, body: updateOrderStatusSchema }), asyncHandler(updateOrderStatusController));

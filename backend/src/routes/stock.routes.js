import { Router } from "express";
import { updateStockController, getStockLogsController, getLowStockController } from "../controllers/stock.controller.js";
import { validate } from "../middlewares/validate.middleware.js";
import { updateStockSchema } from "../validators/stock.validators.js";
import { idParamSchema } from "../validators/common.validators.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { authorize } from "../middlewares/role.middleware.js";
import { asyncHandler } from "../utils/async-handler.js";

export const stockRouter = Router();

stockRouter.use(authenticate, authorize("ADMIN", "EMPLOYEE"));
stockRouter.patch("/:id", validate({ params: idParamSchema, body: updateStockSchema }), asyncHandler(updateStockController));
stockRouter.get("/logs/history", asyncHandler(getStockLogsController));
stockRouter.get("/low-stock/items", asyncHandler(getLowStockController));

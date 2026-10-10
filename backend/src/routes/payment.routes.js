import { Router } from "express";
import { paymentIntentController, paymentVerifyController } from "../controllers/payment.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { asyncHandler } from "../utils/async-handler.js";

export const paymentRouter = Router();

paymentRouter.use(authenticate);
paymentRouter.post("/intent", asyncHandler(paymentIntentController));
paymentRouter.post("/verify", asyncHandler(paymentVerifyController));

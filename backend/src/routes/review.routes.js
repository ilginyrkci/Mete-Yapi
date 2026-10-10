import { Router } from "express";
import { addReviewController, getReviewsController } from "../controllers/review.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { asyncHandler } from "../utils/async-handler.js";

export const reviewRouter = Router();

reviewRouter.get("/:id", asyncHandler(getReviewsController));
reviewRouter.post("/:id", authenticate, asyncHandler(addReviewController));

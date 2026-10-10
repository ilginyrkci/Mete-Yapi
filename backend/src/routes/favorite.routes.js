import { Router } from "express";
import { toggleFavoriteController, getFavoritesController } from "../controllers/favorite.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { asyncHandler } from "../utils/async-handler.js";

export const favoriteRouter = Router();

favoriteRouter.use(authenticate);
favoriteRouter.post("/", asyncHandler(toggleFavoriteController));
favoriteRouter.get("/", asyncHandler(getFavoritesController));

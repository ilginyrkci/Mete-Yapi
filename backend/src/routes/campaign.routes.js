import { Router } from "express";
import { getCampaignsController, getBannersController } from "../controllers/campaign.controller.js";
import { asyncHandler } from "../utils/async-handler.js";

export const campaignRouter = Router();

campaignRouter.get("/", asyncHandler(getCampaignsController));
campaignRouter.get("/banners", asyncHandler(getBannersController));

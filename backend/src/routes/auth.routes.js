import { Router } from "express";
import { registerController, loginController, meController } from "../controllers/auth.controller.js";
import { validate } from "../middlewares/validate.middleware.js";
import { registerSchema, loginSchema } from "../validators/auth.validators.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { asyncHandler } from "../utils/async-handler.js";

export const authRouter = Router();

authRouter.post("/register", validate({ body: registerSchema }), asyncHandler(registerController));
authRouter.post("/login", validate({ body: loginSchema }), asyncHandler(loginController));
authRouter.get("/me", authenticate, asyncHandler(meController));

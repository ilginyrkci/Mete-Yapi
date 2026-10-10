import { Router } from "express";
import { getUsersController, updateRoleController, updateProfileController } from "../controllers/user.controller.js";
import { validate } from "../middlewares/validate.middleware.js";
import { updateRoleSchema } from "../validators/user.validators.js";
import { idParamSchema } from "../validators/common.validators.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { authorize } from "../middlewares/role.middleware.js";
import { asyncHandler } from "../utils/async-handler.js";

export const userRouter = Router();

userRouter.use(authenticate);
userRouter.get("/", authorize("ADMIN"), asyncHandler(getUsersController));
userRouter.patch("/:id/role", authorize("ADMIN"), validate({ params: idParamSchema, body: updateRoleSchema }), asyncHandler(updateRoleController));
userRouter.put("/profile", asyncHandler(updateProfileController));

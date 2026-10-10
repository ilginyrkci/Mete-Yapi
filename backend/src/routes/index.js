import { Router } from "express";
import { authRouter } from "./auth.routes.js";
import { productRouter } from "./product.routes.js";
import { orderRouter } from "./order.routes.js";
import { stockRouter } from "./stock.routes.js";
import { userRouter } from "./user.routes.js";
import { favoriteRouter } from "./favorite.routes.js";
import { reviewRouter } from "./review.routes.js";
import { paymentRouter } from "./payment.routes.js";
import { campaignRouter } from "./campaign.routes.js";
import { dashboardRouter } from "./dashboard.routes.js";

export const apiRouter = Router();

apiRouter.get("/health", (req, res) => res.json({ status: "OK", timestamp: new Date() }));
apiRouter.use("/", authRouter);
apiRouter.use("/auth", authRouter);
apiRouter.use("/products", productRouter);
apiRouter.use("/orders", orderRouter);
apiRouter.use("/stock", stockRouter);
apiRouter.use("/users", userRouter);
apiRouter.use("/favorites", favoriteRouter);
apiRouter.use("/reviews", reviewRouter);
apiRouter.use("/payments", paymentRouter);
apiRouter.use("/campaigns", campaignRouter);
apiRouter.use("/dashboard", dashboardRouter);

import rateLimit from "express-rate-limit";
import xss from "xss";

export const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  message: { message: "Çok fazla istek gönderdiniz, lütfen daha sonra tekrar deneyin." }
});

export function securityMiddleware(req, res, next) {
  if (req.body && typeof req.body === "object") {
    for (const key in req.body) {
      if (typeof req.body[key] === "string") {
        req.body[key] = xss(req.body[key]);
      }
    }
  }
  next();
}

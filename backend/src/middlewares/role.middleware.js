import { ApiError } from "../utils/api-error.js";

export function authorize(...roles) {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return next(new ApiError(403, "Bu işlem için yetkiniz bulunmamaktadır"));
    }
    next();
  };
}

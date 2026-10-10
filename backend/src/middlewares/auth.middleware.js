import { verifyToken } from "../utils/jwt.js";
import { prisma } from "../lib/prisma.js";
import { ApiError } from "../utils/api-error.js";

export async function authenticate(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new ApiError(401, "Yetkilendirme başlığı eksik veya geçersiz");
    }

    const token = authHeader.split(" ")[1];
    const decoded = verifyToken(token);

    const user = await prisma.user.findUnique({ where: { id: decoded.id } });
    if (!user) {
      throw new ApiError(401, "Kullanıcı bulunamadı");
    }

    req.user = user;
    next();
  } catch (error) {
    next(new ApiError(401, "Oturum geçersiz veya süresi doldu"));
  }
}

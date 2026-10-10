import { prisma } from "../lib/prisma.js";
import { hashPassword, comparePassword } from "../utils/password.js";
import { generateToken } from "../utils/jwt.js";
import { ApiError } from "../utils/api-error.js";

export async function registerUser({ name, email, password }) {
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    throw new ApiError(400, "Bu e-posta adresi zaten kayıtlı");
  }

  const hashedPassword = await hashPassword(password);
  const user = await prisma.user.create({
    data: { name, email, password: hashedPassword, role: "CUSTOMER" },
    select: { id: true, name: true, email: true, role: true, createdAt: true }
  });

  const token = generateToken({ id: user.id, role: user.role });
  return { user, token };
}

export async function loginUser({ email, password }) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    throw new ApiError(400, "Geçersiz e-posta veya şifre");
  }

  const validPassword = await comparePassword(password, user.password);
  if (!validPassword) {
    throw new ApiError(400, "Geçersiz e-posta veya şifre");
  }

  const token = generateToken({ id: user.id, role: user.role });
  const { password: _, ...userWithoutPassword } = user;
  return { user: userWithoutPassword, token };
}

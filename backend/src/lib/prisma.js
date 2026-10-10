import { PrismaClient } from "@prisma/client";
import { env } from "../config/env.js";

let prisma;
try {
  prisma = new PrismaClient({
    log: env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"]
  });
} catch {
  console.warn('[AI Studio] Database not connected — using mock');
  const noOp = {
    findMany: async () => [],
    findFirst: async () => null,
    findUnique: async () => null,
    create: async (d) => d?.data ?? {},
    update: async (d) => d?.data ?? {},
    delete: async () => ({}),
    upsert: async (d) => d?.create ?? {},
    deleteMany: async () => ({ count: 0 }),
    count: async () => 0
  };
  prisma = new Proxy({}, {
    get: (_, prop) => {
      if (prop === '$disconnect') return async () => {};
      return new Proxy({}, { get: () => noOp });
    }
  });
}

export { prisma };

import { PrismaClient } from "@prisma/client";

const singlePrismaInstance = () => {
  if (process.env.NODE_ENV === "production") {
    return new PrismaClient();
  } else if (!globalThis.prismaGlobal) {
    globalThis.prismaGlobal = new PrismaClient();
  }

  return globalThis.prismaGlobal;
};

export const prisma = singlePrismaInstance();

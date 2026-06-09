// Change the top import back to this:
import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
  return new PrismaClient();
};

declare global {
  // This prevents TypeScript from complaining about the global variable
  var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>;
}

// If we already have a connection, use it. Otherwise, make a new one.
const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

export default prisma;

// In development mode, save the connection to the global object so it survives hot-reloads
if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma;
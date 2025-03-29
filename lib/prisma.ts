// lib/prisma.ts
import { PrismaClient } from '@prisma/client';

declare global {
  // allow global 'prisma' variable to persist during hot-reloads in development
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

export const prisma = global.prisma || new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});

// In development, assign to the global variable so that subsequent imports reuse the same instance.
if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}
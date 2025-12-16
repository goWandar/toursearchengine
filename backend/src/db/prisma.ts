import { config } from 'dotenv';
config({ path: '../../.env' });

import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

console.log('DATABASE_URL IN ./db:', process.env.DATABASE_URL);

export const prisma = new PrismaClient({
  adapter: new PrismaPg({
    connectionString: process.env.DATABASE_URL!,
  }),
});

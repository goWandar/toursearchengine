import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const tables = await prisma.$queryRawUnsafe<Array<{ table_name: string }>>(
    `SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'`,
  );

  console.log('Connected. Tables in public schema:');
  console.table(tables);
}

main()
  .catch((e) => {
    console.error(' Prisma connection failed:', e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('password123', 10);

  await prisma.user.createMany({
    data: [
      { email: 'test@example.com', password: hashedPassword },
      { email: 'user@example.com', password: hashedPassword },
    ],
  });

  await prisma.store.createMany({
    data: [
      { name: 'Main Store', address: '123 Street' },
      { name: 'Second Store', address: '456 Avenue' },
    ],
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

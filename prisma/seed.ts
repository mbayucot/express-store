import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('password123', 10);

  await Promise.all([
    prisma.user.upsert({
      where: { email: 'test@example.com' },
      update: { password: hashedPassword },
      create: { email: 'test@example.com', password: hashedPassword },
    }),
    prisma.user.upsert({
      where: { email: 'user@example.com' },
      update: { password: hashedPassword },
      create: { email: 'user@example.com', password: hashedPassword },
    }),
  ]);

  const stores = [
    { id: 1, name: 'Main Store', address: '123 Street' },
    { id: 2, name: 'Second Store', address: '456 Avenue' },
  ];

  await Promise.all(
    stores.map((store) =>
      prisma.store.upsert({
        where: { id: store.id },
        update: { address: store.address },
        create: store,
      })
    )
  );
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

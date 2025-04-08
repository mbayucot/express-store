import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('password123', 10);

  // Seed users
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

  // Seed stores
  const stores = [
    { id: 1, name: 'Main Store', address: '123 Street' },
    { id: 2, name: 'Second Store', address: '456 Avenue' },
    { id: 3, name: 'Third Store', address: '789 Boulevard' },
    { id: 4, name: 'Fourth Store', address: '101 Market St' },
    { id: 5, name: 'Fifth Store', address: '202 Central Ave' },
    { id: 6, name: 'Sixth Store', address: '303 State Rd' },
    { id: 7, name: 'Seventh Store', address: '404 Ocean Dr' },
    { id: 8, name: 'Eighth Store', address: '505 Hilltop Ln' },
    { id: 9, name: 'Ninth Store', address: '606 River Rd' },
    { id: 10, name: 'Tenth Store', address: '707 Forest Pkwy' },
    { id: 11, name: 'Eleventh Store', address: '808 Sunrise Blvd' },
    { id: 12, name: 'Twelfth Store', address: '909 Sunset Ave' },
    { id: 13, name: 'Thirteenth Store', address: '111 City Square' },
    { id: 14, name: 'Fourteenth Store', address: '222 Maple St' },
    { id: 15, name: 'Fifteenth Store', address: '333 Birch Ln' },
    { id: 16, name: 'Sixteenth Store', address: '444 Pine Rd' },
    { id: 17, name: 'Seventeenth Store', address: '555 Oak Blvd' },
    { id: 18, name: 'Eighteenth Store', address: '666 Cedar Ave' },
    { id: 19, name: 'Nineteenth Store', address: '777 Elm St' },
    { id: 20, name: 'Twentieth Store', address: '888 Poplar Dr' },
  ];

  await Promise.all(
    stores.map((store) =>
      prisma.store.upsert({
        where: { id: store.id },
        update: { address: store.address },
        create: store,
      }),
    ),
  );

  // Seed categories
  const categoryNames = [
    'Food',
    'Books',
    'Clothing',
    'Electronics',
    'Toys',
    'Home',
    'Garden',
  ];
  const categories = await Promise.all(
    categoryNames.map((name) =>
      prisma.category.upsert({
        where: { name },
        update: {},
        create: { name },
      }),
    ),
  );

  // Seed products with category relationships
  for (const store of stores) {
    for (let i = 0; i < 5; i++) {
      const product = await prisma.product.create({
        data: {
          name: faker.commerce.productName(),
          price: parseFloat(faker.commerce.price({ min: 5, max: 200 })),
          storeId: store.id,
        },
      });

      // Assign 1–3 random categories to the product
      const randomCategories = faker.helpers.arrayElements(
        categories,
        faker.number.int({ min: 1, max: 3 }),
      );

      await prisma.productCategory.createMany({
        data: randomCategories.map((category) => ({
          productId: product.id,
          categoryId: category.id,
        })),
        skipDuplicates: true,
      });
    }
  }
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.product.deleteMany();
  await prisma.user.deleteMany();

  // Seed Users
  const users = await Promise.all(
    Array(5)
      .fill(null)
      .map(async () => {
        const salt = await bcrypt.genSalt(10);
        return prisma.user.create({
          data: {
            name: faker.person.fullName(),
            email: faker.internet.email(),
            password: await bcrypt.hash('12345', salt),
          },
        });
      }),
  );

  // Seed Products
  const products = await Promise.all(
    Array(10)
      .fill(null)
      .map(() =>
        prisma.product.create({
          data: {
            name: faker.commerce.productName(),
            price: parseFloat(faker.commerce.price()),
          },
        }),
      ),
  );

  // Seed Orders and Order Items
  for (const user of users) {
    for (let i = 0; i < 5; i++) {
      const createdAt = faker.date.recent({ days: 180 });
      const order = await prisma.order.create({
        data: {
          userId: user.id,
          totalAmount: 0,
          createdAt: createdAt,
        },
      });

      const orderProductCount = faker.number.int({ min: 2, max: 4 });
      const selectedProducts = faker.helpers.arrayElements(
        products,
        orderProductCount,
      );

      let totalOrderAmount = 0;
      for (const product of selectedProducts) {
        const quantity = faker.number.int({ min: 1, max: 3 });
        const itemPrice = product.price * quantity;

        await prisma.orderItem.create({
          data: {
            orderId: order.id,
            productId: product.id,
            quantity,
            price: itemPrice,
          },
        });

        totalOrderAmount += itemPrice;
      }

      // Update order total amount
      await prisma.order.update({
        where: { id: order.id },
        data: { totalAmount: totalOrderAmount },
      });
    }
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  await prisma.user.upsert({
    where: { email: 'admin@demo.com' },
    update: {},
    create: {
      email: 'admin@demo.com',
      password: await bcrypt.hash('Admin123', 10),
      role: 'ADMIN',
    },
  });

  await prisma.user.upsert({
    where: { email: 'user@demo.com' },
    update: {},
    create: {
      email: 'user@demo.com',
      password: await bcrypt.hash('User123', 10),
      role: 'USER',
    },
  });

  // 🛒 PRODUCTS
  await prisma.product.createMany({
    data: [
      {
        name: 'Dog Food Premium',
        description: 'Alimento premium para perros',
        price: 12000,
        image:
          'https://res.cloudinary.com/dgwhnezd8/image/upload/v1770310885/jamon-natural_kdgran.png',
        stock: 15,
        category: 'FOOD',
      },
      {
        name: 'Cat Toy',
        description: 'Juguete divertido para gatos',
        price: 5000,
        image:
          'https://res.cloudinary.com/dgwhnezd8/image/upload/v1770310885/jamon-natural_kdgran.png',
        stock: 30,
        category: 'TOYS',
      },
      {
        name: 'Dog Leash',
        description: 'Correa resistente',
        price: 8000,
        image:
          'https://res.cloudinary.com/dgwhnezd8/image/upload/v1770310885/jamon-natural_kdgran.png',
        stock: 20,
        category: 'ACCESSORIES',
      },
      {
        name: 'Dog Leash',
        description: 'Correa resistente',
        price: 8000,
        image:
          'https://res.cloudinary.com/dgwhnezd8/image/upload/v1770310885/jamon-natural_kdgran.png',
        stock: 20,
        category: 'ACCESSORIES',
      },
      {
        name: 'Dog Leash',
        description: 'Correa resistente',
        price: 8000,
        image:
          'https://res.cloudinary.com/dgwhnezd8/image/upload/v1770310885/jamon-natural_kdgran.png',
        stock: 20,
        category: 'ACCESSORIES',
      },
    ],
    skipDuplicates: true, // 👈 clave para no duplicar en cada seed
  });

  console.log('🌱 Seed completo ejecutado');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

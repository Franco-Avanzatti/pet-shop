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
        name: 'Correa Extensible',
        description: 'lorem15',
        price: 12000,
        image:
          'https://res.cloudinary.com/dgwhnezd8/image/upload/v1778816992/D_NQ_NP_921996-MLU72847934885_112023-F_ynuwix.jpg',
        stock: 15,
        category: 'accesorios',
      },
      {
        name: 'Baño para gato',
        description: 'Loremx15',
        price: 5000,
        image:
          'https://res.cloudinary.com/dgwhnezd8/image/upload/v1778816991/D_NQ_NP_2X_736000-MLA94026816759_102025-F_cqfenr.webp',
        stock: 30,
        category: 'gatos',
      },
      {
        name: 'Mochila Transportadora Càpsula Celeste',
        description: 'Loremx15',
        price: 8000,
        image:
          'https://res.cloudinary.com/dgwhnezd8/image/upload/v1778816991/mochila-transportadora-para-mascota-transparente-ventilada-celeste_zfylvf.png',
        stock: 20,
        category: 'accesorios',
      },
      {
        name: 'Mochila Transportadora Càpsula Negra',
        description: 'Loremx15',
        price: 8000,
        image:
          'https://res.cloudinary.com/dgwhnezd8/image/upload/v1778816991/af97d0b2eed847114ced1905df30_rit6v2.jpg',
        stock: 20,
        category: 'accesorios',
      },
      {
        name: 'Cama Octagonal para Perros',
        description:
          'La cama octogonal para mascotas tamaño S es un refugio acogedor y confortable para tu mascota. Confeccionada con piel de melocotón de poliéster en la funda y tela Oxford de poliéster en la base, garantiza durabilidad y comodidad. Su almohadón de franela y relleno de algodón brindan suavidad y calidez para un descanso placentero. Además, su diseño reversible y fácil de lavar, apto para lavarropas, proporciona practicidad y conveniencia. Con medidas de 45 cm × 40 cm y una altura de 16 cm, esta cama es ideal para mascotas pequeñas que buscan un lugar cómodo para descansar.',
        price: 8000,
        image:
          'https://res.cloudinary.com/dgwhnezd8/image/upload/v1778816991/D_772166-MLA93543843248_102025-C_tddi6u.jpg',
        stock: 20,
        category: 'accesorios',
      },
      {
        name: 'Cama Rectangular para Perros',
        description:
          'La cama rectangular para mascotas tamaño S es un refugio acogedor y confortable para tu mascota. Confeccionada con piel de melocotón de poliéster en la funda y tela Oxford de poliéster en la base, garantiza durabilidad y comodidad. Su almohadón de franela y relleno de algodón brindan suavidad y calidez para un descanso placentero. Además, su diseño reversible y fácil de lavar, apto para lavarropas, proporciona practicidad y conveniencia. Con medidas de 45 cm × 40 cm y una altura de 16 cm, esta cama es ideal para mascotas pequeñas que buscan un lugar cómodo para descansar.',
        price: 8000,
        image:
          'https://res.cloudinary.com/dgwhnezd8/image/upload/v1778816991/9d64a744869d8222d23b6457dba01079ceed24324a156d131c303c10196e33dc216845_qi8hvy.jpg',
        stock: 20,
        category: 'accesorios',
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

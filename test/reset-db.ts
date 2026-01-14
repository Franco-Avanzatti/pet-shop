import { PrismaService } from '../prisma/prisma.service';

export async function resetDb(prisma: PrismaService): Promise<void> {
  await prisma.cartItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.cart.deleteMany();
  await prisma.product.deleteMany();
  // ⚠️ NO borrar users
}

import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Prisma, Cart } from '@prisma/client';

@Injectable()
export class CartService {
  constructor(private prisma: PrismaService) {}

  async getCart(userId: string) {
    return this.prisma.cart.findUnique({
      where: { userId },
      include: {
        items: {
          include: { product: true },
        },
      },
    });
  }

  async addItem(userId: string, dto: { productId: string; quantity: number }) {
    const { productId, quantity } = dto;

    let cart: Cart | null;

    try {
      cart = await this.prisma.cart.upsert({
        where: { userId },
        update: {},
        create: { userId },
      });
    } catch (error: unknown) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        cart = await this.prisma.cart.findUnique({
          where: { userId },
        });
      } else {
        throw error;
      }
    }

    if (!cart) {
      throw new BadRequestException('Cart could not be created');
    }

    return this.prisma.cartItem.upsert({
      where: {
        cartId_productId: {
          cartId: cart.id,
          productId,
        },
      },
      update: {
        quantity: {
          increment: quantity,
        },
      },
      create: {
        cartId: cart.id,
        productId,
        quantity,
      },
    });
  }

  async updateItem(
    userId: string,
    dto: { productId: string; quantity: number },
  ) {
    const cart = await this.ensureCart(userId);

    const cartItem = await this.prisma.cartItem.findUnique({
      where: {
        cartId_productId: {
          cartId: cart.id,
          productId: dto.productId,
        },
      },
    });

    if (!cartItem) {
      throw new BadRequestException('Product is not in cart');
    }

    return this.prisma.cartItem.update({
      where: { id: cartItem.id },
      data: { quantity: dto.quantity },
    });
  }

  async removeItem(userId: string, itemId: string) {
    const deleted = await this.prisma.cartItem.deleteMany({
      where: {
        id: itemId,
        cart: { userId },
      },
    });

    if (deleted.count === 0) {
      return { message: 'Item already removed' };
    }

    return { message: 'Item removed' };
  }

  async clearCart(userId: string) {
    const cart = await this.prisma.cart.findUnique({
      where: { userId },
    });

    if (!cart) {
      return { message: 'Cart already empty' };
    }

    await this.prisma.cartItem.deleteMany({
      where: { cartId: cart.id },
    });

    return { message: 'Cart cleared successfully' };
  }

  private async ensureCart(userId: string): Promise<Cart> {
    const cart = await this.prisma.cart.findUnique({
      where: { userId },
    });

    if (cart) return cart;

    return this.prisma.cart.create({
      data: { userId },
    });
  }
}

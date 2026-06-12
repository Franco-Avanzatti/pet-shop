import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { MercadoPagoService } from '../mercadopago/mercadopago.service';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrdersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly mpService: MercadoPagoService,
  ) {}

  async create(userId: string, dto: CreateOrderDto) {
    const { shippingAddress } = dto;

    const cart = await this.prisma.cart.findUnique({
      where: { userId },
      include: {
        items: {
          include: { product: true },
        },
      },
    });

    if (!cart || cart.items.length === 0) {
      throw new Error('Cart is empty');
    }

    const total = cart.items.reduce(
      (acc, item) => acc + item.product.price * item.quantity,
      0,
    );

    // 🔥 FIX IMPORTANTE: Prisma Json necesita objeto plano
    const shippingAddressJson = {
      ...shippingAddress,
    };

    const order = await this.prisma.order.create({
      data: {
        userId,
        status: 'PENDING',
        total,
        shippingAddress: shippingAddressJson, // ✅ FIX PRISMA JSON

        items: {
          create: cart.items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.product.price,
          })),
        },
      },
    });

    const mpItems = cart.items.map((item) => ({
      id: item.product.id,
      title: item.product.name, // ✅ FIX correcto según tu schema
      quantity: item.quantity,
      unit_price: item.product.price,
    }));

    const preference = await this.mpService.createPreference(mpItems, order.id);

    return {
      orderId: order.id,
      init_point: preference.init_point,
      sandbox_init_point: preference.sandbox_init_point,
    };
  }

  async findByUser(userId: string) {
    return this.prisma.order.findMany({
      where: { userId },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });
  }
}

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { MercadoPagoConfig, Payment } from 'mercadopago';
import { env } from '../config/env.config';

@Injectable()
export class PaymentsService {
  private readonly payment: Payment;

  constructor(private readonly prisma: PrismaService) {
    const client = new MercadoPagoConfig({
      accessToken: env.MP_ACCESS_TOKEN,
    });
    this.payment = new Payment(client);
  }

  async handleWebhook(body: Record<string, unknown>) {
    const type = body.type as string;

    if (type !== 'payment') return { received: true };

    const data = body.data as Record<string, string>;
    const paymentId = data?.id;

    if (!paymentId) return { received: true };

    const payment = await this.payment.get({ id: paymentId });

    const orderId = payment.external_reference;
    const status = payment.status;

    if (!orderId) return { received: true };

    if (status === 'approved') {
      await this.prisma.order.update({
        where: { id: orderId },
        data: { status: 'PAID' },
      });
    }

    if (status === 'rejected') {
      await this.prisma.order.update({
        where: { id: orderId },
        data: { status: 'CANCELLED' },
      });
    }

    return { received: true };
  }
}

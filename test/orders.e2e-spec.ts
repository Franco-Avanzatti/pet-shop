import request from 'supertest';
import { INestApplication } from '@nestjs/common';
import type { Server } from 'http';
import { createTestApp } from './setup';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/* =======================
   Interfaces de respuesta
   ======================= */

interface LoginResponse {
  access_token: string;
}

interface ProductResponse {
  id: string;
  price: number;
}

interface OrderResponse {
  id: string;
  total: number;
}

interface CartResponse {
  items: unknown[];
}

describe('Orders (e2e)', () => {
  let app: INestApplication;
  let server: Server;
  let token: string;
  let productId: string;
  let productPrice: number;

  beforeAll(async () => {
    app = await createTestApp();
    server = app.getHttpServer() as Server;
  });

  beforeEach(async () => {
    await prisma.cartItem.deleteMany();
    await prisma.order.deleteMany();
    await prisma.cart.deleteMany();
    await prisma.product.deleteMany();

    const loginRes = await request(server)
      .post('/api/auth/login')
      .send({
        email: 'admin@demo.com',
        password: 'Admin123',
      })
      .expect(201);

    const loginBody = loginRes.body as LoginResponse;
    token = loginBody.access_token;

    const productRes = await request(server)
      .post('/api/products')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Order Product',
        description: 'desc',
        image: 'img',
        category: 'FOOD',
        price: 100,
        stock: 10,
      })
      .expect(201);

    const productBody = productRes.body as ProductResponse;
    productId = productBody.id;
    productPrice = productBody.price;
  });

  afterAll(async () => {
    await app.close();
  });

  it('create order and empty cart', async () => {
    await request(server)
      .post('/api/cart/items')
      .set('Authorization', `Bearer ${token}`)
      .send({ productId, quantity: 3 })
      .expect(201);

    const orderRes = await request(server)
      .post('/api/orders')
      .set('Authorization', `Bearer ${token}`)
      .expect(201);

    const orderBody = orderRes.body as OrderResponse;
    expect(orderBody.total).toBe(productPrice * 3);

    const cartRes = await request(server)
      .get('/api/cart')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    const cartBody = cartRes.body as CartResponse;
    expect(cartBody.items).toHaveLength(0);
  });
});

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
}

interface CartItemResponse {
  id: string;
  quantity: number;
}

describe('Cart (e2e)', () => {
  let app: INestApplication;
  let server: Server;
  let token: string;
  let productId: string;
  let cartItemId: string;

  beforeAll(async () => {
    app = await createTestApp();
    server = app.getHttpServer() as Server;
  });

  beforeEach(async () => {
    await prisma.cartItem.deleteMany();
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
        name: 'Cart Product',
        description: 'desc',
        image: 'img',
        category: 'FOOD',
        price: 100,
        stock: 10,
      })
      .expect(201);

    const productBody = productRes.body as ProductResponse;
    productId = productBody.id;
  });

  afterAll(async () => {
    await app.close();
  });

  it('add, update and remove cart item', async () => {
    const addRes = await request(server)
      .post('/api/cart/items')
      .set('Authorization', `Bearer ${token}`)
      .send({ productId, quantity: 2 })
      .expect(201);

    const addBody = addRes.body as CartItemResponse;
    cartItemId = addBody.id;

    const updateRes = await request(server)
      .patch('/api/cart/items')
      .set('Authorization', `Bearer ${token}`)
      .send({ productId, quantity: 5 })
      .expect(200);

    const updateBody = updateRes.body as CartItemResponse;
    expect(updateBody.quantity).toBe(5);

    await request(server)
      .delete(`/api/cart/items/${cartItemId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
  });
});

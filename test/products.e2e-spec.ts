import request from 'supertest';
import { INestApplication } from '@nestjs/common';
import type { Server } from 'http';
import { createTestApp } from './setup';

jest.setTimeout(20000);

interface LoginResponse {
  access_token: string;
  user: {
    id: string;
    email: string;
    role: string;
  };
}

interface ProductResponse {
  id: string;
  name: string;
  description: string;
  price: number;
}

describe('Products (e2e)', () => {
  let app: INestApplication;
  let server: Server;
  let token: string;
  let productId: string;

  beforeAll(async () => {
    app = await createTestApp();
    server = app.getHttpServer() as Server;

    const loginRes = await request(server)
      .post('/api/auth/login')
      .send({
        email: 'admin@demo.com',
        password: 'Admin123',
      })
      .expect(201);

    const loginBody: LoginResponse = loginRes.body as LoginResponse;
    token = loginBody.access_token;
  });

  afterAll(async () => {
    await app.close();
  });

  it('create product', async () => {
    const res = await request(server)
      .post('/api/products')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Test Product',
        description: 'desc',
        image: 'img',
        category: 'FOOD',
        price: 100,
        stock: 10,
      })
      .expect(201);

    const body: ProductResponse = res.body as ProductResponse;
    productId = body.id;

    expect(productId).toBeDefined();
  });

  it('update product', async () => {
    await request(server)
      .patch(`/api/products/${productId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ price: 200 })
      .expect(200);
  });

  it('delete product', async () => {
    await request(server)
      .delete(`/api/products/${productId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
  });
});

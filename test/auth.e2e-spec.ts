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

describe('Auth (e2e)', () => {
  let app: INestApplication;
  let server: Server;

  beforeAll(async () => {
    app = await createTestApp();
    server = app.getHttpServer() as Server;
  });

  afterAll(async () => {
    await app.close();
  });

  it('login admin OK', async () => {
    const res = await request(server)
      .post('/api/auth/login')
      .send({
        email: 'admin@demo.com',
        password: 'Admin123',
      })
      .expect(201);

    const body = res.body as LoginResponse;

    expect(body.access_token).toBeDefined();
    expect(body.user.role).toBe('ADMIN');
  });

  it('login fail - wrong password', async () => {
    await request(server)
      .post('/api/auth/login')
      .send({
        email: 'admin@demo.com',
        password: 'wrong',
      })
      .expect(401);
  });
});

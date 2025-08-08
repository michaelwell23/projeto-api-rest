import { AppModule } from '@/infra/app.module';
import { PrismaService } from '@/infra/prisma/prisma.service';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { hash } from 'bcryptjs';
import { access } from 'fs';
import request from 'supertest';

describe('Authenticate e2e', () => {
  let app: INestApplication;
  let prismaService: PrismaService;

  beforeAll(async () => {
    const moudule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moudule.createNestApplication();

    prismaService = app.get(PrismaService);
    await prismaService.$connect();

    await app.init();
  });

  test('[POST] /sessions', async () => {
    await prismaService.user.create({
      data: {
        name: 'marie Currie',
        email: 'mariecurrie@exemplo.com',
        password: await hash('123456', 8),
      },
    });

    const response = await request(app.getHttpServer()).post('/sessions').send({
      email: 'mariecurrie@exemplo.com',
      password: '123456',
    });

    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      access_token: expect.any(String),
    });
  });
});

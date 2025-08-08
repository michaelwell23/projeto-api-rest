import { AppModule } from '@/infra/app.module';
import { PrismaService } from '@/infra/prisma/prisma.service';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';

describe('Create account e2e', () => {
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

  test('[POST] /accounts', async () => {
    const response = await request(app.getHttpServer()).post('/accounts').send({
      name: 'marie Currie',
      email: 'mariecurrie@exemplo.com',
      password: '123456',
    });

    expect(response.status).toBe(201);

    const userOnDatabase = await prismaService.user.findUnique({
      where: {
        email: 'mariecurrie@exemplo.com',
      },
    });

    expect(userOnDatabase).toBeTruthy();
  });
});

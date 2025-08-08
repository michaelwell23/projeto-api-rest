import { access } from 'fs';
import { AppModule } from '@/infra/app.module';
import { PrismaService } from '@/infra/prisma/prisma.service';
import { INestApplication } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import { hash } from 'bcryptjs';
import request from 'supertest';

describe('Create Question e2e', () => {
  let app: INestApplication;
  let prismaService: PrismaService;
  let jwtService: JwtService;

  beforeAll(async () => {
    const moudule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moudule.createNestApplication();

    prismaService = app.get(PrismaService);
    jwtService = app.get(JwtService);

    await app.init();
  });

  test('[POST] /questions', async () => {
    const user = await prismaService.user.create({
      data: {
        name: 'marie Currie',
        email: 'mariecurrie@exemplo.com',
        password: await hash('123456', 8),
      },
    });

    const accessToken = jwtService.sign({
      sub: user.id,
    });

    const response = await request(app.getHttpServer())
      .post('/questions')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        title: 'New Question',
        content: 'This is a test question',
      });

    expect(response.status).toBe(201);

    const questionOnDatabase = await prismaService.question.findFirst({
      where: {
        title: 'New Question',
      },
    });

    expect(questionOnDatabase).toBeTruthy();
  });
});

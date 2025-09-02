import { AppModule } from '@/infra/app.module';
import { PrismaService } from '@/infra/database/prisma/prisma.service';

import { INestApplication } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import request from 'supertest';

describe('Get questions by slug e2e', () => {
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

  test('[GET] /questions/:slug', async () => {
    const user = await prismaService.user.create({
      data: {
        name: 'marie Currie',
        email: 'mariecurrie@exemplo.com',
        password: '123456',
      },
    });

    const accessToken = jwtService.sign({
      sub: user.id,
    });

    await prismaService.question.createMany({
      data: [
        {
          title: 'Question 1',
          slug: 'question-1',
          content: 'Content of question 1',
          authorId: user.id,
        },
      ],
    });

    const response = await request(app.getHttpServer())
      .get('/questions/question-1')
      .set('Authorization', `Bearer ${accessToken}`)
      .send();

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      question: [expect.objectContaining({ title: 'Question 1' })],
    });
  });
});

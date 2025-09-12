import { AppModule } from '@/infra/app.module';
import { INestApplication } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { DatabaseModule } from '@/infra/database/database.module';

import { StudentFactory } from 'test/factories/make-student';
import { PrismaService } from '@/infra/database/prisma/prisma.service';

describe('Create Question e2e', () => {
  let app: INestApplication;
  let prismaService: PrismaService;
  let studentFactory: StudentFactory;
  let jwtService: JwtService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [StudentFactory],
    }).compile();

    app = moduleRef.createNestApplication();

    studentFactory = moduleRef.get(StudentFactory);
    prismaService = moduleRef.get(PrismaService);
    jwtService = moduleRef.get(JwtService);

    await app.init();
  });

  test('[POST] /questions', async () => {
    const user = await studentFactory.makePrismaStudent();

    const accessToken = jwtService.sign({
      sub: user.id.toString(),
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

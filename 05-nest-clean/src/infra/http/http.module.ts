import { Module } from '@nestjs/common';
import { DatabaseModule } from '@/infra/database/database.module';

import { CreateAccountController } from '@/infra/http/controllers/create-account.controller';
import { AuthenticateController } from '@/infra/http/controllers/authenticate.controller';
import { CreateQuestionController } from '@/infra/http/controllers/create-question.controller';
import { FetchRecentQuestionsController } from '@/infra/http/controllers/fetch-recent-questions.controller';
import { PrismaService } from '../database/prisma/prisma.service';
import { PrismaQuestionRespository } from '../database/prisma/repositories/prisma-questions-repository';
import { PrismaAnswersResporitory } from '../database/prisma/repositories/prisma-answers-repository';
import { PrismaQuestionCommentsRepository } from '../database/prisma/repositories/prisma-question-comments-repository';
import { PrismaQuestionAttachmentsRepository } from '../database/prisma/repositories/prisma-question-attachments-repository';
import { PrismaAnswerAttachmentsRepository } from '../database/prisma/repositories/prisma-answer-attachments-repository';
import { PrismaAnswerCommentsRepository } from '../database/prisma/repositories/prisma-answer-comments-repository';

import { CreateQuestionUseCase } from '@/domain/forum/application/use-cases/create-question';

@Module({
  imports: [DatabaseModule],
  controllers: [
    CreateAccountController,
    AuthenticateController,
    CreateQuestionController,
    FetchRecentQuestionsController,
  ],
  exports: [
    PrismaService,
    PrismaQuestionRespository,
    PrismaQuestionCommentsRepository,
    PrismaQuestionAttachmentsRepository,
    PrismaAnswersResporitory,
    PrismaAnswerCommentsRepository,
    PrismaAnswerAttachmentsRepository,
  ],
  providers: [CreateQuestionUseCase],
})
export class HttpModule {}

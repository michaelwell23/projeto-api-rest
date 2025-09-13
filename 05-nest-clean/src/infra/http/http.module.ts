import { Module } from '@nestjs/common';
import { DatabaseModule } from '@/infra/database/database.module';

import { CreateAccountController } from '@/infra/http/controllers/create-account.controller';
import { RegisterStudentUseCase } from '@/domain/forum/application/use-cases/register-student';

import { AuthenticateController } from '@/infra/http/controllers/authenticate.controller';
import { AuthenticateStudentUseCase } from '@/domain/forum/application/use-cases/authenticate-student';

import { FetchRecentQuestionsController } from '@/infra/http/controllers/fetch-recent-questions.controller';
import { FetchRecentQuestionsUseCase } from '@/domain/forum/application/use-cases/fetch-recent-questions';

import { CreateQuestionController } from '@/infra/http/controllers/create-question.controller';
import { CreateQuestionUseCase } from '@/domain/forum/application/use-cases/create-question';

import { CryptographyModule } from '../cryptography/cryptography.module';

import { GetQuestionBySlugUseCase } from '@/domain/forum/application/use-cases/get-question-by-slug';
import { GetQuestionBySlugController } from './controllers/get-question-by-slug.controller';

import { EditQuestionController } from './controllers/edit-question.controller';
import { EditQuestionUseCase } from '@/domain/forum/application/use-cases/edit-question';

import { DeleteQuestionController } from './controllers/delete-question.controller';
import { DeleteQuestionUseCase } from '@/domain/forum/application/use-cases/delete-question';

import { AnswerQuestionController } from './controllers/answer-question.controller';
import { AnswerQuestionUseCase } from '@/domain/forum/application/use-cases/answer-question';

import { DeleteAnswerUseCase } from '@/domain/forum/application/use-cases/delete-answer';
import { DeleteAnswerController } from './controllers/delete-answer.controller';

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [
    CreateQuestionController,
    AuthenticateController,
    FetchRecentQuestionsController,
    GetQuestionBySlugController,
    CreateAccountController,
    EditQuestionController,
    DeleteAnswerController,
    DeleteQuestionController,
    AnswerQuestionController,
  ],
  providers: [
    CreateQuestionUseCase,
    AuthenticateStudentUseCase,
    FetchRecentQuestionsUseCase,
    GetQuestionBySlugUseCase,
    RegisterStudentUseCase,
    EditQuestionUseCase,
    DeleteQuestionUseCase,
    DeleteAnswerUseCase,
    AnswerQuestionUseCase,
  ],
})
export class HttpModule {}

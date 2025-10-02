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
import { EditAnswerController } from './controllers/edit-answer.controller';
import { ChooseQuestionBestAnswerUseCase } from '@/domain/forum/application/use-cases/choose-question-best-answer';
import { CommentOnAnswerUseCase } from '@/domain/forum/application/use-cases/comment-on-answer';
import { EditAnswerUseCase } from '@/domain/forum/application/use-cases/edit-answer';
import { FetchQuestionAnswersUseCase } from '@/domain/forum/application/use-cases/fetch-question-answers';
import { CommentOnQuestionUseCase } from '@/domain/forum/application/use-cases/comment-on-question';
import { DeleteQuestionCommentUseCase } from '@/domain/forum/application/use-cases/delete-question-comment';
import { DeleteAnswerCommentUseCase } from '@/domain/forum/application/use-cases/delete-answer-comment';
import { FetchAnswerCommentsUseCase } from '@/domain/forum/application/use-cases/fetch-answer-comments';
import { ReadNotificationUseCase } from '@/domain/notification/application/use-cases/read-notification';
import { CommentOnQuestionController } from './controllers/comment-on-question.controller';
import { DeleteQuestionCommentController } from './controllers/delete-question-comment.controller';
import { FetchAnswerCommentsController } from './controllers/fetch-answer-comments.controller';

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [
    CreateAccountController,
    AuthenticateController,
    CreateQuestionController,
    FetchRecentQuestionsController,
    GetQuestionBySlugController,
    EditQuestionController,
    DeleteQuestionController,
    CommentOnQuestionController,
    AnswerQuestionController,
    EditAnswerController,
    DeleteAnswerController,
    DeleteQuestionCommentController,
    FetchAnswerCommentsUseCase,
    FetchAnswerCommentsController,
  ],
  providers: [
    CreateQuestionUseCase,
    FetchRecentQuestionsUseCase,
    RegisterStudentUseCase,
    AuthenticateStudentUseCase,
    GetQuestionBySlugUseCase,
    EditQuestionUseCase,
    DeleteQuestionUseCase,
    AnswerQuestionUseCase,
    EditAnswerUseCase,
    DeleteAnswerUseCase,
    FetchQuestionAnswersUseCase,
    ChooseQuestionBestAnswerUseCase,
    CommentOnQuestionUseCase,
    DeleteQuestionCommentUseCase,
    CommentOnAnswerUseCase,
    DeleteAnswerCommentUseCase,
    FetchAnswerCommentsUseCase,
    ReadNotificationUseCase,
    CommentOnQuestionUseCase,
  ],
})
export class HttpModule {}

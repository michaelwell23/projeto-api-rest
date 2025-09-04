import { faker } from '@faker-js/faker';

import { UniqueEntityID } from '@/core/entities/unique-entity-id';

import {
  QuestionComment,
  QuestionCommentProps,
} from '@/domain/forum/enterprise/entities/question-comment';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/infra/database/prisma/prisma.service';
import { QuestionProps } from '@/domain/forum/enterprise/entities/question';
import { Question } from '@prisma/client';
import { PrismaQuestionCommentMapper } from '@/infra/database/prisma/mappers/prisma-question-comment-mapper';

export function makeQuestionComment(
  override: Partial<QuestionCommentProps> = {},
  id?: UniqueEntityID
) {
  const question = QuestionComment.create(
    {
      authorId: new UniqueEntityID(),
      questionId: new UniqueEntityID(),
      content: faker.lorem.text(),
      ...override,
    },
    id
  );

  return question;
}

@Injectable()
export class QUestionFactory {
  constructor(private PrismaService: PrismaService) {}

  async makePrismaQuestionComment(
    data: Partial<QuestionCommentProps> = {}
  ): Promise<QuestionComment> {
    const questionComment = makeQuestionComment(data);

    await this.PrismaService.comment.create({
      data: PrismaQuestionCommentMapper.toPrisma(questionComment),
    });

    return questionComment;
  }
}

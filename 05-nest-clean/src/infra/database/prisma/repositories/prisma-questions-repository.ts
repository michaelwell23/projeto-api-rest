import { PaginationParams } from '@/core/repositories/pagination-params';
import { QuestionsRepository } from '@/domain/forum/application/repositories/questions-repository';
import { Question } from '@/domain/forum/enterprise/entities/question';
import { Injectable } from '@nestjs/common';
import { PrismaQuestionMapper } from '../mappers/prisma-question-mapper';
import { PrismaService } from '../prisma.service';
import { QuestionDetails } from '@/domain/forum/enterprise/entities/value-objects/question-details';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Slug } from '@/domain/forum/enterprise/entities/value-objects/slug';

@Injectable()
export class PrismaQuestionsRepository implements QuestionsRepository {
  constructor(private prisma: PrismaService) {}

  async findDetailsBySlug(slug: string): Promise<QuestionDetails | null> {
    const question = await this.prisma.question.findUnique({
      where: { slug },
      include: {
        author: true,
        answers: {
          include: {
            author: true,
          },
        },
      },
    });

    if (!question) {
      return null;
    }

    return QuestionDetails.create({
      questionId: new UniqueEntityID(question.id),
      title: question.title,
      content: question.content,
      slug: Slug.create(question.slug),
      createdAt: question.createdAt,
      updatedAt: question.updatedAt,
      author: question.author.name,
      answers: question.answers.map((answer) => ({
        id: answer.id,
        content: answer.content,
        createdAt: answer.createdAt,
        author: {
          id: answer.author.id,
          name: answer.author.name,
        },
      })),
    });
  }

  async create(question: Question): Promise<void> {
    const data = PrismaQuestionMapper.toPrisma(question);

    await this.prisma.question.create({
      data,
    });
  }

  async findBySlug(slug: string): Promise<Question | null> {
    const question = await this.prisma.question.findUnique({
      where: {
        slug,
      },
    });
    if (!question) {
      return null;
    }

    return PrismaQuestionMapper.toDomain(question);
  }
  async findById(id: string): Promise<Question | null> {
    const question = await this.prisma.question.findUnique({
      where: {
        id,
      },
    });
    if (!question) {
      return null;
    }

    return PrismaQuestionMapper.toDomain(question);
  }
  async delete(question: Question): Promise<void> {
    const data = PrismaQuestionMapper.toPrisma(question);

    await this.prisma.question.delete({
      where: {
        id: data.id,
      },
    });
  }
  async save(question: Question): Promise<void> {
    const data = PrismaQuestionMapper.toPrisma(question);

    await this.prisma.question.update({
      data,
      where: {
        id: data.id,
      },
    });
  }

  async findManyRecent(params: PaginationParams): Promise<Question[]> {
    const questions = await this.prisma.question.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      take: 20,
      skip: (params.page - 1) * 20,
    });

    return questions.map(PrismaQuestionMapper.toDomain);
  }
}

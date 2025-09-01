import { QuestionAttachment } from '../../enterprise/entities/question-attachment';

export interface QuestionAttachmentsRepository {
  findManyByQuestionId(questionId: string): Promise<QuestionAttachment[]>;
  deleteManyByQuestionId(questionId: string): Promise<void>;
  deleteMany(attachments: QuestionAttachment[]): Promise<void>;
  createMany(attachments: QuestionAttachment[]): Promise<void>;
}

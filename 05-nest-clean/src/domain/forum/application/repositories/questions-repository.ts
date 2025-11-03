import { Question } from '@/domain/forum/enterprise/entities/question';

export abstract class QuestionsRepository {
  abstract findById(id: string): Promise<Question | null>;
  abstract findBySlug(slug: string): Promise<Question | null>;
  abstract save(question: Question): Promise<void>;
  abstract create(question: Question): Promise<void>;
  abstract delete(question: Question): Promise<void>;
}

import { Comment } from '@/domain/forum/enterprise/entities/comment';

export class CommeentPresenter {
  static toHTTP(comment: Comment<any>) {
    return {
      id: comment.id,
      content: comment.content,
      createdAt: comment.createdAt,
      updatedAt: comment.updatedAt,
    };
  }
}

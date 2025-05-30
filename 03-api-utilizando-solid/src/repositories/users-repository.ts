import { Prisma, User } from '@prisma/client';

export interface UsersRepository {
  create(data: Prisma.UserCreateInput): Promise<User>;
  findByEmail(
    email: string
  ): Promise<{ id: string; name: string; email: string } | null>;
  // findById(
  //   id: string
  // ): Promise<{ id: string; name: string; email: string } | null>;
  // update(
  //   id: string,
  //   data: { name?: string; email?: string; password_hash?: string }
  // ): Promise<void>;
  // delete(id: string): Promise<void>;
  // list(): Promise<Array<{ id: string; name: string; email: string }>>;
}

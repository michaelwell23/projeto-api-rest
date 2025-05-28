import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';

export class PrimasUsersRepository {
  async create(data: PrismaClient) {
    const user = await prisma.user.create({
      data,
    });

    return user;
  }

  // async findByEmail(email: string) {
  //   const user = await prisma.user.findUnique({
  //     where: {
  //       email,
  //     },
  //   });

  //   return user;
  // }
}

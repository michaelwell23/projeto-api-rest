import { prisma } from '@/lib/prisma';
import { hash } from 'bcryptjs';

import { PrismaUserRepository } from '@/repositories/prisma-users-respository';
interface RegisterUseCaseRequest {
  name: string;
  email: string;
  password: string;
}

export async function registerUseCase({
  name,
  email,
  password,
}: RegisterUseCaseRequest) {
  const password_hash = await hash(password, 8);

  const userWithSameEmail = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (userWithSameEmail) {
    throw new Error('Email already exist.');
  }

  const prismaUserRepository = new PrismaUserRepository();

  await prismaUserRepository.create({
    name,
    email,
    password_hash,
  });
}

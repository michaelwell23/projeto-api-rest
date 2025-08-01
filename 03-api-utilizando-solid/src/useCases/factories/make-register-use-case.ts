import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-respository';
import { RegisterUseCase } from '@/useCases/register';

export function makeRegisterUseCase() {
  const usersRepository = new PrismaUsersRepository();
  const registerUseCase = new RegisterUseCase(usersRepository);

  return registerUseCase;
}

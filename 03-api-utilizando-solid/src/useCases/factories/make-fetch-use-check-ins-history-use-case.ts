import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository';
import { fetchMemberCheckInsHistoryUseCase } from '../fetch-member-check-ins-history';

export function makeFetchUserCheckInsHistoryUseCase() {
  const checkInsRepository = new PrismaCheckInsRepository();
  const useCase = new fetchMemberCheckInsHistoryUseCase(checkInsRepository);

  return useCase;
}

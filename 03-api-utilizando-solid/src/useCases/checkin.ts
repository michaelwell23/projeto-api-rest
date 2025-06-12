import { CheckInsRepository } from './../repositories/check-ins-repository';
import { CheckIn } from '@prisma/client';
import { ResourceNotFoundError } from './errors/resource-not-found-error';

interface CheckInUseCaseRequest {
  userId: string;
  gymId: string;
}

interface CheckInUseCaseResponse {
  checkIn: CheckIn;
}

export class CheckInUseCase {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({
    userId,
    gymId,
  }: CheckInUseCaseRequest): Promise<CheckInUseCaseResponse> {
    const checkIn = await this.checkInsRepository.create({
      gym_id: gymId,
      user_id: userId,
      created_at: String(Date.now()),
    });

    return {
      checkIn,
    };
  }
}

import { CheckInsRepository } from './../repositories/check-ins-repository';
import { CheckIn } from '@prisma/client';

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
    const CheckInOnSameDate = await this.checkInsRepository.findByIdOnDate(
      userId,
      new Date()
    );

    if (CheckInOnSameDate) {
      throw new Error();
    }

    const checkIn = await this.checkInsRepository.create({
      gym_id: gymId,
      user_id: userId,
      created_at: new Date(),
    });

    return {
      checkIn,
    };
  }
}

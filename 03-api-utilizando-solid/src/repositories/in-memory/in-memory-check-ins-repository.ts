import { CheckIn, Prisma } from '@prisma/client';
import { CheckInsRepository } from '../check-ins-repository';
import { randomUUID } from 'node:crypto';

export class InMemoryCheckInsRepository implements CheckInsRepository {
  public items: CheckIn[] = [];

  async create(data: Prisma.CheckInUncheckedCreateInput) {
    const checkIn: CheckIn = {
      id: randomUUID(),
      gym_id: data.gym_id,
      user_id: data.user_id,
      validated_ate: data.validated_ate ? new Date(data.validated_ate) : null,
      created_at: new Date(),
    };

    this.items.push(checkIn);

    return checkIn;
  }
}

import { Gym, Prisma } from '@prisma/client';
import { GymsRepository } from './../gyms-repository';
import { randomUUID } from 'node:crypto';

export class GymsRepositoryInMemory implements GymsRepository {
  public items: Gym[] = [];

  async findById(id: string): Promise<Gym | null> {
    const gym = this.items.find((item) => item.id === id);

    if (!gym) {
      return null;
    }

    return gym || null;
  }
}

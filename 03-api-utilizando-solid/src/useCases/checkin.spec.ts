import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository';
import { expect, describe, it, beforeEach } from 'vitest';
import { CheckInUseCase } from './checkin';

let checkInsRepository: InMemoryCheckInsRepository;
let sut: CheckInUseCase;

describe('Check-in Use Case', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository();
    sut = new CheckInUseCase(checkInsRepository);
  });

  it('should be able to check in', async () => {
    const { checkIn } = await sut.execute({
      userId: 'user-1',
      gymId: 'gym-1',
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });
});

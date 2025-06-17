import { expect, describe, it, beforeEach } from 'vitest';
import { CreateGymUseCase } from './create-gym';
import { GymsRepositoryInMemory } from '@/repositories/in-memory/in-memory-gyms-respository';

let gymsRepository: GymsRepositoryInMemory;
let sut: CreateGymUseCase;

describe('Create Gym Use Case', () => {
  beforeEach(() => {
    gymsRepository = new GymsRepositoryInMemory();
    sut = new CreateGymUseCase(gymsRepository);
  });

  it('should to create gym', async () => {
    const { gym } = await sut.execute({
      title: 'Gym 01',
      description: null,
      phone: null,
      latitude: -27.2092052,
      longitude: -49.6401091,
    });

    expect(gym.id).toEqual(expect.any(String));
  });
});

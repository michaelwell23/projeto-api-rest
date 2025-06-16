import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository';
import { expect, describe, it, beforeEach, vi, afterEach } from 'vitest';
import { CheckInUseCase } from './checkin';
import { GymsRepositoryInMemory } from '@/repositories/in-memory/in-memory-gyms-respository';
import { Decimal } from '@prisma/client/runtime';
import { ResourceNotFoundError } from './errors/resource-not-found-error';

let checkInsRepository: InMemoryCheckInsRepository;
let gymsRepositoryInMemory: GymsRepositoryInMemory;
let sut: CheckInUseCase;

describe('Check-in Use Case', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository();
    gymsRepositoryInMemory = new GymsRepositoryInMemory();
    sut = new CheckInUseCase(checkInsRepository, gymsRepositoryInMemory);

    await gymsRepositoryInMemory.items.push({
      id: 'gym-01',
      title: 'Gym-01',
      description: 'Description of Gym 1',
      phone: '123456789',
      latitude: new Decimal(-23.5505),
      longitude: new Decimal(-46.6333),
    });

    vi.useRealTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should be able to check in', async () => {
    const { checkIn } = await sut.execute({
      userId: 'user-01',
      gymId: 'gym-01',
      userLatitude: -23.5505,
      userLongitude: -46.6333,
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  it('should not be able to check in twice in the same day', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0));

    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -23.5505,
      userLongitude: -46.6333,
    });

    await expect(() =>
      sut.execute({
        gymId: 'gym-01',
        userId: 'user-01',
        userLatitude: -23.5505,
        userLongitude: -46.6333,
      })
    ).rejects.toBeInstanceOf(Error);
  });

  it('should be able to check in twice but in different days', async () => {
    vi.setSystemTime(new Date(2023, 3, 1, 10, 0, 0));

    await sut.execute({
      userId: 'user-01',
      gymId: 'gym-01',
      userLatitude: -23.5505,
      userLongitude: -46.6333,
    });

    vi.setSystemTime(new Date(2023, 3, 2, 10, 0, 0));

    const { checkIn } = await sut.execute({
      userId: 'user-01',
      gymId: 'gym-01',
      userLatitude: -23.5505,
      userLongitude: -46.6333,
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  it('should not be able to check in on distant gym', async () => {
    await gymsRepositoryInMemory.items.push({
      id: 'gym-02',
      title: 'Gym-02',
      description: 'Description of Gym 2',
      phone: '967809788',
      latitude: new Decimal(-23.1948993),
      longitude: new Decimal(-47.3310689),
    });

    await expect(() =>
      sut.execute({
        userId: 'user-01',
        gymId: 'gym-02',
        userLatitude: -23.5505,
        userLongitude: -46.6333,
      })
    ).rejects.toBeInstanceOf(Error);
  });
});

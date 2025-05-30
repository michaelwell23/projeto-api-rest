import { hash } from 'bcryptjs';

import { UsersRepository } from '@/repositories/users-repository';
interface RegisterUseCaseRequest {
  name: string;
  email: string;
  password: string;
}

export class RegisterUseCase {
  constructor(private userRepository: UsersRepository) {}

  async execute({ name, email, password }: RegisterUseCaseRequest) {
    const password_hash = await hash(password, 8);

    const userWithSameEmail = await this.userRepository.findByEmail(email);

    if (userWithSameEmail) {
      throw new Error('Email already exist.');
    }

    await this.userRepository.create({
      name,
      email,
      password_hash,
    });
  }
}

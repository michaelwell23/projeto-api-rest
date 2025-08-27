import { RegisterStudentUseCase } from '@/domain/forum/application/use-cases/register-student';
import { z } from 'zod';
import {
  BadRequestException,
  ConflictException,
  UnauthorizedException,
  UsePipes,
} from '@nestjs/common';

import { Body, Controller, HttpCode, Post } from '@nestjs/common';

import { ZodValidationPipe } from '@/infra/http/pipes/zod-validate-pipe';
import { StudentAlreadyExistsError } from '@/domain/forum/application/use-cases/errors/student-already-exists-error';
import { Public } from '@/infra/auth/public';

const createAccountSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  password: z.string().min(6).max(100),
});

type CreateAccountBodySchema = z.infer<typeof createAccountSchema>;
@Controller('/accounts')
@Public()
export class CreateAccountController {
  constructor(private readonly registerStudent: RegisterStudentUseCase) {}

  @Post()
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(createAccountSchema))
  async handle(@Body() body: CreateAccountBodySchema) {
    const { name, email, password } = body;

    const results = await this.registerStudent.execute({
      name,
      email,
      password,
    });

    if (results.isLeft()) {
      const error = results.value;

      switch (error.constructor) {
        case StudentAlreadyExistsError:
          throw new ConflictException(error.message);
        default:
          throw new BadRequestException(error.message);
      }
    }
  }
}

import { PrismaService } from '@/infra/database/prisma/prisma.service';
import { faker } from '@faker-js/faker';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import {
  Student,
  StudentProps,
} from '@/domain/forum/enterprise/entities/student';
import { Injectable } from '@nestjs/common';
import { PrismaStudentMapper } from '@/infra/database/prisma/mappers/prisma-student-mapper';

export function makeStudent(
  override: Partial<StudentProps> = {},
  id?: UniqueEntityID
) {
  const student = Student.create(
    {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      ...override,
    },
    id
  );

  return student;
}

@Injectable()
export class StudentFactory {
  constructor(private PrismaService: PrismaService) {}

  async makePrismaStudent(data: Partial<StudentProps> = {}): Promise<Student> {
    const student = makeStudent(data);

    await this.PrismaService.user.create({
      data: PrismaStudentMapper.toPrisma(student),
    });

    return student;
  }
}

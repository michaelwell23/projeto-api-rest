import { Module } from '@nestjs/common';

import { PrismaService } from './prisma/prisma.service';
import { CreateAccountController } from './controllers/create-account.controller';

@Module({
  imports: [CreateAccountController],
  providers: [PrismaService],
})
export class AppModule {}

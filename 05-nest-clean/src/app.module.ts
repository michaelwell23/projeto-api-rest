import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService], //providers é tudo aquilo que não recebe requisições HTTP diretamente. É tudo que é injetável, como serviços, repositórios, etc.
})
export class AppModule {}

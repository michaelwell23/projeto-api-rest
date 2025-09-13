import {
  BadRequestException,
  Controller,
  Get,
  Injectable,
  Param,
} from '@nestjs/common';
import { QuestionPresenter } from '../presenters/question-presenter';

import { GetQuestionBySlugUseCase } from './../../../domain/forum/application/use-cases/get-question-by-slug';

@Injectable()
@Controller('/questions/:slug')
export class GetQuestionBySlugController {
  constructor(private getQuestionBySlug: GetQuestionBySlugUseCase) {}

  @Get()
  async handle(@Param('slug') slug: string) {
    const result = await this.getQuestionBySlug.execute({
      slug,
    });

    if (result.isLeft()) {
      throw new BadRequestException();
    }

    return { question: QuestionPresenter.toHTTP(result.value.question) };
  }
}

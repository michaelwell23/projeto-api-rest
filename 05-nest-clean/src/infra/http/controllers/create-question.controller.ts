import { z } from 'zod';
import { Body, Controller, Post, BadRequestException } from '@nestjs/common';

import { CreateQuestionUseCase } from '@/domain/forum/application/use-cases/create-question';
import { CurrentUser } from '@/infra/auth/current-user-decorator';
import { UserPayload } from '@/infra/auth/jwt.strategy';
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validate-pipe';

const createQuestionBodySchema = z.object({
  title: z.string(),
  content: z.string(),
  attachments: z.array(z.string().uuid()),
});

const bodyValidationPipe = new ZodValidationPipe(createQuestionBodySchema);
type CreateQuestionBodySchema = z.infer<typeof createQuestionBodySchema>;

@Controller('/questions')
export class CreateQuestionController {
  constructor(private createQuestionUseCase: CreateQuestionUseCase) {}

  @Post()
  async handle(
    @Body(bodyValidationPipe) body: CreateQuestionBodySchema,
    @CurrentUser() user: UserPayload
  ) {
    const { title, content, attachments } = body;
    const userId = user.sub;

    await this.createQuestionUseCase.execute({
      title,
      content,
      authorId: userId,
      attachmentsIds: attachments,
    });
  }
}

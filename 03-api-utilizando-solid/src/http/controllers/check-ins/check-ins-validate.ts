import { z } from 'zod';
import { FastifyReply, FastifyRequest } from 'fastify';

import { makeValidateCheckInUseCase } from '@/useCases/factories/make-validate-check-in-use-case';

export async function validateCheckIn(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const validateCheckParamsInUseCase = z.object({
    checkInId: z.string().uuid(),
  });

  const { checkInId } = validateCheckParamsInUseCase.parse(request.params);

  const validateCheckInUseCase = makeValidateCheckInUseCase();

  await validateCheckInUseCase.execute({
    checkInId,
  });

  return reply.status(204).send();
}

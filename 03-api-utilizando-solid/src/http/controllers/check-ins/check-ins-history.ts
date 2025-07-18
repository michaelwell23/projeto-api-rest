import { z } from 'zod';
import { FastifyReply, FastifyRequest } from 'fastify';

import { makeFetchUserCheckInsHistoryUseCase } from '@/useCases/factories/make-fetch-use-check-ins-history-use-case';

export async function history(request: FastifyRequest, reply: FastifyReply) {
  const checkInHistoryQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1),
  });

  const { page } = checkInHistoryQuerySchema.parse(request.query);

  const fatchUserCheckInsHistoryUseCase = makeFetchUserCheckInsHistoryUseCase();

  const { checkIns } = await fatchUserCheckInsHistoryUseCase.execute({
    userId: request.user.sub,
    page,
  });

  return reply.status(200).send({
    checkIns,
  });
}

import { z } from 'zod';
import { makeSearchGymsUseCase } from '@/useCases/factories/make-search-gyms-use-case';
import { FastifyReply, FastifyRequest } from 'fastify';

export async function search(request: FastifyRequest, reply: FastifyReply) {
  const searchGymsQuerySchema = z.object({
    query: z.string().min(2).max(100),
    page: z.coerce.number().min(1).default(1),
  });

  const { query, page } = searchGymsQuerySchema.parse(request.query);

  const searchGymsUseCase = makeSearchGymsUseCase();

  const { gyms } = await searchGymsUseCase.execute({
    query,
    page,
  });

  return reply.status(200).send({
    gyms,
  });
}

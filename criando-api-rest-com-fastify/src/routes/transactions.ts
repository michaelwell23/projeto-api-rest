import { FastifyInstance } from 'fastify';
import knex from 'knex';
import { z } from 'zod';

export async function transactionsRoutes(app: FastifyInstance) {
  app.post('/', async (request, reply) => {
    const createTransactionBodySchema = z.object({
      title: z.string(),
      amout: z.number(),
      type: z.enum(['credit', 'debit']),
    });

    const { title, amout, type } = createTransactionBodySchema.parse(
      request.body
    );

    await knex('transactions').insert({
      id: crypto.randomUUID(),
      title,
      amout: type === 'credit' ? amout : amout * -1,
    });

    return reply.status(201).send();
  });
}

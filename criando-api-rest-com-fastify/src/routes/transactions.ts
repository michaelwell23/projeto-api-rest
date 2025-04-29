import { FastifyInstance } from 'fastify';
import knex from 'knex';

export async function transactionsRoutes(app: FastifyInstance) {
  app.get('/', async () => {
    const transactions = await knex('transactions')
      .insert({
        id: crypto.randomUUID(),
        title: 'Test Transection',
        amount: 1000,
      })
      .returning('*');

    return transactions;
  });
}

import fastify from 'fastify';
import crypto from 'crypto';
import { knex } from './connections/database';

const app = fastify();

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

app.listen({ port: 3000 }).then(() => {
  console.log('Server is running at http://localhost:3000');
});

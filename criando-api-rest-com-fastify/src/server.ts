import { env } from './env/index';
import fastify from 'fastify';
import crypto from 'crypto';
import { knex } from './connections/database';
import { transactionsRoutes } from './routes/transactions';

const app = fastify();

app.register(transactionsRoutes);

app.listen({ port: 3000 }).then(() => {
  console.log('Server is running at http://localhost:3000');
});

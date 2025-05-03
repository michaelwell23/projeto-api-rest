/* eslint-disable prettier/prettier */
import { env } from './env/index';
import fastify from 'fastify';
import { transactionsRoutes } from './routes/transactions';
import fastifyCookie from '@fastify/cookie';

const app = fastify();

app.register(fastifyCookie);
app.register(transactionsRoutes, {
  prefix: 'transactions',
});

app.listen({ port: env.PORT }).then(() => {
  console.log(`Server is running at http://localhost:${env.PORT}`);
});

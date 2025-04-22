import fastify from 'fastify';
import { knex } from './database/connection';

const app = fastify();

app.get('/', async () => {
  const tables = knex('sqlite_schema').select('*');

  return tables;
});

app.listen({ port: 3000 }).then(() => {
  console.log('Server is running at http://localhost:3000');
});

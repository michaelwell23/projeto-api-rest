import { env } from '../env/index';
import { knex as setupKnex, Knex } from 'knex';

export const config: Knex.Config = {
  client: 'sqlite3',
  connection: {
    filename: env.DATABASE_URL,
  },
  useNullAsDefault: true,
  migrations: {
    extension: 'ts',
    directory: './src/connections/migrations',
  },
};

export const knex = setupKnex(config);

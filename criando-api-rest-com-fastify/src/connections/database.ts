import { env } from '../env/index';
import { knex as setupKnex, Knex } from 'knex';

export const config: Knex.Config = {
  client: 'sqlite3',
  connection: {
    filename: env.DATABASE_URL,
  },
  migrations: {
    extension: 'ts',
    directory: './src/connections/migrations',
  },
  useNullAsDefault: true,
};

export const knex = setupKnex(config);

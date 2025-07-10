import { verifyJwt } from '@/http/middlewares/verify-jwt';
import { FastifyInstance } from 'fastify';

import { search } from './gymSearch';
import { nearby } from './gymNearby';
import { create } from './gymCreate';

export async function gymsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt);

  app.get('/search', search);
  app.get('/nearby', nearby);
  app.post('/', create);
}

import { verifyJwt } from '@/http/middlewares/verify-jwt';
import { FastifyInstance } from 'fastify';

import { search } from './gymSearch';
import { nearby } from './gymNearby';
import { create } from './gymCreate';
import { verifyUserRole } from '@/http/middlewares/verify-user-role';

export async function gymsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt);

  app.get('/search', search);
  app.get('/nearby', nearby);
  app.post('/', { onRequest: [verifyUserRole('ADMIN')] }, create);
}

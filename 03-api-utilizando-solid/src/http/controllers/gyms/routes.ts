import { verifyJwt } from '@/http/middlewares/verify-jwt';
import { FastifyInstance } from 'fastify';

export async function gymsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt);

  // app.post('/gyms', create);
  // app.get('/gyms', list);
  // app.get('/gyms/:id', show);
  // app.put('/gyms/:id', update);
  // app.delete('/gyms/:id', remove);
}

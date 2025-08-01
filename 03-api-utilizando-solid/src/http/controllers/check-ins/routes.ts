import { verifyJwt } from '@/http/middlewares/verify-jwt';
import { FastifyInstance } from 'fastify';
import { create } from './check-ins-create';
import { metrics } from './check-ins-metrics';
import { history } from './check-ins-history';
import { validateCheckIn } from './check-ins-validate';

export async function checkInsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt);

  app.get('/check-ins/history', history);
  app.get('/check-ins/metrics', metrics);

  app.post('/gyms/:gymId/check-ins', create);
  app.patch('/check-ins/:checkInId/validate', validateCheckIn);
}

import fastifyJwt from '@fastify/jwt';
import fastify from 'fastify';
import { ZodError } from 'zod';

import { env } from './env';

import { usersRoutes } from './http/controllers/users/routes';
import { gymsRoutes } from './http/controllers/gyms/routes';

export const app = fastify();

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
});

app.register(usersRoutes);
app.register(gymsRoutes);

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation error', issues: error.format() });
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error);
  } else {
    // In production, you might want to log the error to an external service
    // e.g., Sentry, Loggly, etc.
  }

  return reply.status(500).send({
    message: 'Internal server error',
    error: error.message,
  });
});

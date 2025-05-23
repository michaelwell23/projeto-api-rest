import fastify from 'fastify';
import { z } from 'zod';
import { prisma } from './lib/prisma';

export const app = fastify();

app.post('/users', async (resquest, reply) => {
  const resgisterBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { name, email, password } = resgisterBodySchema.parse(resquest.body);

  await prisma.user.create({
    data: {
      name,
      email,
      password_hash: password,
    },
  });

  return reply.status(201).send({ Messagem: 'User created' });
});

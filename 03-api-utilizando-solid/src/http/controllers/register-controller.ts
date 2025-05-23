import { FastifyReply, FastifyRequest } from 'fastify';

import { prisma } from '@/lib/prisma';
import { z } from 'zod';

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const resgisterBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { name, email, password } = resgisterBodySchema.parse(request.body);

  await prisma.user.create({
    data: {
      name,
      email,
      password_hash: password,
    },
  });

  return reply.status(201).send({ Messagem: 'User created' });
}

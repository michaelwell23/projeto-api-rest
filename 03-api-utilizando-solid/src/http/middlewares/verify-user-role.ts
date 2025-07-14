import { FastifyReply, FastifyRequest } from 'fastify';

export function verifyUserRole(roleToVerify: 'ADMIN' | 'MEMBER') {
  return (request: FastifyRequest, reply: FastifyReply) => {
    const { role } = request.user;

    if (role !== roleToVerify) {
      return reply.status(403).send({ message: 'Permission denied' });
    }
  };
}

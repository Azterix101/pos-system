import { FastifyInstance } from 'fastify';
import { signUp, logIn } from '../services';
import { signUpSchema , logInSchema } from '../schemas'

export const authRoutes = async (fastify: FastifyInstance) => {
  fastify.post('/signup', { schema: signUpSchema }, async (request, reply) => {
    const { email, password } = request.body as { email: string, password: string };
    try {
      const result = await signUp(email, password);
      reply.status(201).send(result);
    } catch (error) {
      reply.status(400).send({ message: (error as Error).message });
    }
  });

  fastify.post('/login', { schema: logInSchema }, async (request, reply) => {
    const { email, password } = request.body as { email: string, password: string };
    try {
      const result = await logIn(email, password);
      reply.send(result);
    } catch (error) {
      reply.status(401).send({ message: 'Invalid credentials' });
    }
  });
};

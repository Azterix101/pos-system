import { FastifyInstance } from 'fastify';
import { createTransaction, getTransaction } from '../services';
import { createTransactionSchema, getTransactionSchema } from '../schemas'

export const transactionRoutes = async (fastify: FastifyInstance) => {
  fastify.post('/transactions', { schema: createTransactionSchema }, async (request, reply) => {
    const { productId, quantity, totalAmount } = request.body as { productId: number, quantity: number, totalAmount: number };
    const transaction = await createTransaction(productId, quantity, totalAmount);
    reply.send(transaction);
  });

  fastify.get('/transactions/:id', { schema: getTransactionSchema }, async (request, reply) => {
    const { id } = request.params as { id: number };
    const transaction = await getTransaction(id);
    reply.send(transaction);
  });
};

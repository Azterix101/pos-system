import { FastifyInstance } from 'fastify';
import { createUpsell, getUpsells, deleteUpsell } from '../services';
import { createUpsellSchema, getUpsellSchema, deleteUpsellSchema } from '../schemas'


export const upsellRoutes = async (fastify: FastifyInstance) => {
  fastify.post('/upsells', { schema: createUpsellSchema }, async (request, reply) => {
    const { productId, upsellProductId } = request.body as { productId: number, upsellProductId: number };
    const upsell = await createUpsell(productId, upsellProductId);
    reply.send(upsell);
  });

  fastify.get('/upsells/:productId', { schema: getUpsellSchema }, async (request, reply) => {
    const { productId } = request.params as { productId: number };
    const upsells = await getUpsells(productId);
    reply.send(upsells);
  });

  fastify.delete('/upsells/:productId/:upsellProductId', { schema: deleteUpsellSchema }, async (request, reply) => {
    const { productId, upsellProductId } = request.params as { productId: number, upsellProductId: number };
    try {
      await deleteUpsell(productId, upsellProductId);
      reply.send({ message: 'Upsell deleted successfully' });
    } catch (error) {
      reply.status(404).send({ message: (error as Error).message });
    }
  });
};

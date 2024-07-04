import { FastifyInstance } from 'fastify';
import { createProduct, getProducts, updateProduct, deleteProduct } from '../services';
import { createProductSchema, getProductsSchema , updateProductSchema , deleteProductSchema } from '../schemas'

export const productRoutes = async (fastify: FastifyInstance) => {
  fastify.post('/products', { schema: createProductSchema }, async (request, reply) => {
    const { name, price, description, quantity } = request.body as { name: string, price: number, description: string, quantity: number };
    const product = await createProduct(name, price, description, quantity);
    reply.send(product);
  });

  fastify.get('/products', { schema: getProductsSchema }, async (request, reply) => {
    const products = await getProducts();
    reply.send(products);
  });

  fastify.put('/products/:id', { schema: updateProductSchema }, async (request, reply) => {
    const { id } = request.params as { id: number };
    const { name, price, description, quantity } = request.body as { name: string, price: number, description: string, quantity: number };
    try {
      const product = await updateProduct(id, name, price, description, quantity);
      reply.send(product);
    } catch (error) {
      reply.status(404).send({ message: (error as Error).message });
    }
  });

  fastify.delete('/products/:id', { schema: deleteProductSchema }, async (request, reply) => {
    const { id } = request.params as { id: number };
    try {
      await deleteProduct(id);
      reply.send({ message: 'Product deleted successfully' });
    } catch (error) {
      reply.status(404).send({ message: (error as Error).message });
    }
  });
};

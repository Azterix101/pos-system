import Fastify from 'fastify';
import fastifySwagger from '@fastify/swagger';
import fastifyStatic from '@fastify/static';
import path from 'path';
import * as dotenv from 'dotenv';
import { authRoutes, productRoutes, transactionRoutes, upsellRoutes } from './routes';
import sequelize from './utils/database';

const fastify = Fastify();
dotenv.config();

const swaggerOptions = {
  routePrefix: '/documentation',
  swagger: {
    info: {
      title: 'POS System API',
      description: 'API documentation for the POS system',
      version: '1.0.0',
    },
    host: 'localhost:3000',
    schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/json'],
  },
  exposeRoute: true,
  mode: 'dynamic' as const,
};

fastify.register(fastifySwagger, swaggerOptions);

// Register static plugin
fastify.register(fastifyStatic, {
  root: path.join(__dirname, 'public'),
  prefix: '/public/', // optional: default '/'
});

// Health check route
fastify.get('/', async (request, reply) => {
  return { status: 'ok' };
});

fastify.register(authRoutes);
fastify.register(productRoutes);
fastify.register(upsellRoutes);
fastify.register(transactionRoutes);

const start = async () => {
  try {
    await sequelize.sync();
    await fastify.listen({ port: 3000, host: '0.0.0.0' });
    console.log('Server running on port 3000');
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

start();

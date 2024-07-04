import { FastifySchema } from 'fastify';

export const createUpsellSchema: FastifySchema = {
  body: {
    type: 'object',
    required: ['productId', 'upsellProductId'],
    properties: {
      productId: { type: 'number' },
      upsellProductId: { type: 'number' },
    },
  },
};

export const getUpsellSchema: FastifySchema = {
  params: {
    type: 'object',
    required: ['productId'],
    properties: {
      productId: { type: 'number' },
    },
  },
};

export const deleteUpsellSchema: FastifySchema = {
  params: {
    type: 'object',
    required: ['productId', 'upsellProductId'],
    properties: {
      productId: { type: 'number' },
      upsellProductId: { type: 'number' },
    },
  },
};
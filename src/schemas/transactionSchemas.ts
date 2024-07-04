import { FastifySchema } from 'fastify';

export const createTransactionSchema: FastifySchema = {
  body: {
    type: 'object',
    required: ['productId', 'quantity', 'totalAmount'],
    properties: {
      productId: { type: 'number' },
      quantity: { type: 'number' },
      totalAmount: { type: 'number' },
    },
  },
};

export const getTransactionSchema: FastifySchema = {
  params: {
    type: 'object',
    required: ['id'],
    properties: {
      id: { type: 'number' },
    },
  },
};
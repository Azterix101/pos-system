import { FastifySchema } from 'fastify';

export const createProductSchema: FastifySchema = {
  body: {
    type: 'object',
    required: ['name', 'price', 'description', 'quantity'],
    properties: {
      name: { type: 'string' },
      price: { type: 'number' },
      description: { type: 'string' },
      quantity: { type: 'number' },
    },
  },
  response: {
    200: {
      type: 'object',
      properties: {
        id: { type: 'number' },
        name: { type: 'string' },
        price: { type: 'number' },
        description: { type: 'string' },
        quantity: { type: 'number' },
      },
    },
  },
  operationId: 'createProduct',
  tags: ['product'],
  summary: 'Create a new product',
};

export const getProductsSchema: FastifySchema = {
  response: {
    200: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'number' },
          name: { type: 'string' },
          price: { type: 'number' },
          description: { type: 'string' },
          quantity: { type: 'number' },
        },
      },
    },
  },
  operationId: 'getProducts',
  tags: ['product'],
  summary: 'Get all products',
};

export const updateProductSchema: FastifySchema = {
  body: {
    type: 'object',
    required: ['name', 'price', 'description', 'quantity'],
    properties: {
      name: { type: 'string' },
      price: { type: 'number' },
      description: { type: 'string' },
      quantity: { type: 'number' },
    },
  },
  params: {
    type: 'object',
    required: ['id'],
    properties: {
      id: { type: 'number' },
    },
  },
  response: {
    200: {
      type: 'object',
      properties: {
        id: { type: 'number' },
        name: { type: 'string' },
        price: { type: 'number' },
        description: { type: 'string' },
        quantity: { type: 'number' },
      },
    },
  },
  operationId: 'updateProduct',
  tags: ['product'],
  summary: 'Update a product',
};

export const deleteProductSchema: FastifySchema = {
  params: {
    type: 'object',
    required: ['id'],
    properties: {
      id: { type: 'number' },
    },
  },
  response: {
    200: {
      type: 'object',
      properties: {
        message: { type: 'string' },
      },
    },
  },
  operationId: 'deleteProduct',
  tags: ['product'],
  summary: 'Delete a product',
};
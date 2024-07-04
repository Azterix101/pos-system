import { FastifySchema } from 'fastify';

export const signUpSchema: FastifySchema = {
  body: {
    type: 'object',
    required: ['email', 'password'],
    properties: {
      email: { type: 'string', format: 'email' },
      password: { type: 'string', minLength: 6 },
    },
  },
  response: {
    201: {
      type: 'object',
      properties: {
        user: {
          type: 'object',
          properties: {
            id: { type: 'number' },
            email: { type: 'string' },
          },
        },
        token: { type: 'string' },
      },
    },
  },
  tags: ['auth'],
  summary: 'Sign up a new user',
};

export const logInSchema: FastifySchema = {
  body: {
    type: 'object',
    required: ['email', 'password'],
    properties: {
      email: { type: 'string', format: 'email' },
      password: { type: 'string' },
    },
  },
  response: {
    200: {
      type: 'object',
      properties: {
        user: {
          type: 'object',
          properties: {
            id: { type: 'number' },
            email: { type: 'string' },
          },
        },
        token: { type: 'string' },
      },
    },
  },
  tags: ['auth'],
  summary: 'Log in a user',
};

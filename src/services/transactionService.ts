import Transaction from '../models/transaction';

export const createTransaction = async (productId: number, quantity: number, totalAmount: number) => {
  const transaction = await Transaction.create({ productId, quantity, totalAmount });
  return transaction;
};

export const getTransaction = async (id: number) => {
  const transaction = await Transaction.findByPk(id, { include: ['product'] });
  return transaction;
};

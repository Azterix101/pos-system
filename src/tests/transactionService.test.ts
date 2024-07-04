import { createTransaction, getTransaction } from '../services/transactionService';
import Transaction from '../models/transaction';

jest.mock('../models/transaction');

describe('TransactionService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create a transaction', async () => {
    const mockTransaction = { id: 1, productId: 1, quantity: 10, totalAmount: 1000 };
    const mockCreate = jest.spyOn(Transaction, 'create').mockResolvedValue(mockTransaction as never);

    const transaction = await createTransaction(1, 10, 1000);
    expect(transaction).toEqual(mockTransaction);
    expect(mockCreate).toHaveBeenCalledWith({ productId: 1, quantity: 10, totalAmount: 1000 });
  });

  it('should get a transaction', async () => {
    const mockTransaction = { id: 1, productId: 1, quantity: 10, totalAmount: 1000 };
    const mockFindByPk = jest.spyOn(Transaction, 'findByPk').mockResolvedValue(mockTransaction as never);

    const transaction = await getTransaction(1);
    expect(transaction).toEqual(mockTransaction);
    expect(mockFindByPk).toHaveBeenCalledWith(1, { include: ['product'] });
  });
});

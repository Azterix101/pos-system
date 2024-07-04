import { createUpsell, getUpsells, deleteUpsell } from '../services/upsellService';
import Upsell from '../models/upsell';

jest.mock('../models/upsell');

describe('UpsellService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create an upsell', async () => {
    const mockUpsell = { id: 1, productId: 1, upsellProductId: 2 };
    const mockCreate = jest.spyOn(Upsell, 'create').mockResolvedValue(mockUpsell as never);

    const upsell = await createUpsell(1, 2);
    expect(upsell).toEqual(mockUpsell);
    expect(mockCreate).toHaveBeenCalledWith({ productId: 1, upsellProductId: 2 });
  });

  it('should get all upsells for a product', async () => {
    const mockUpsells = [
      { id: 1, productId: 1, upsellProductId: 2 },
      { id: 2, productId: 1, upsellProductId: 3 },
    ];
    const mockFindAll = jest.spyOn(Upsell, 'findAll').mockResolvedValue(mockUpsells as never);

    const upsells = await getUpsells(1);
    expect(upsells).toEqual(mockUpsells);
    expect(mockFindAll).toHaveBeenCalledWith({ where: { productId: 1 }, include: ['upsellProduct'] });
  });

  it('should delete an upsell', async () => {
    const mockUpsell = { id: 1, productId: 1, upsellProductId: 2, destroy: jest.fn() };
    const mockFindOne = jest.spyOn(Upsell, 'findOne').mockResolvedValue(mockUpsell as never);

    await deleteUpsell(1, 2);
    expect(mockFindOne).toHaveBeenCalledWith({ where: { productId: 1, upsellProductId: 2 } });
    expect(mockUpsell.destroy).toHaveBeenCalled();
  });
});

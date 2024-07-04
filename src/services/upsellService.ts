import Upsell from '../models/upsell';

export const createUpsell = async (productId: number, upsellProductId: number) => {
  const upsell = await Upsell.create({ productId, upsellProductId });
  return upsell;
};

export const getUpsells = async (productId: number) => {
  const upsells = await Upsell.findAll({ where: { productId }, include: ['upsellProduct'] });
  return upsells;
};

export const deleteUpsell = async (productId: number, upsellProductId: number) => {
  const upsell = await Upsell.findOne({ where: { productId, upsellProductId } });
  if (upsell) {
    await upsell.destroy();
    return;
  }
  throw new Error('Upsell not found');
};

import Product from '../models/product';

export const createProduct = async (name: string, price: number, description: string, quantity: number) => {
  const product = await Product.create({ name, price, description, quantity });
  return product;
};

export const getProducts = async () => {
  const products = await Product.findAll();
  return products;
};

export const updateProduct = async (id: number, name: string, price: number, description: string, quantity: number) => {
  const product = await Product.findByPk(id);
  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.quantity = quantity;
    await product.save();
    return product;
  }
  throw new Error('Product not found');
};

export const deleteProduct = async (id: number) => {
  const product = await Product.findByPk(id);
  if (product) {
    await product.destroy();
    return;
  }
  throw new Error('Product not found');
};

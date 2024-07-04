import { createProduct, getProducts, updateProduct, deleteProduct } from '../services/productService';
import Product from '../models/product';

jest.mock('../models/product');

describe('ProductService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create a product', async () => {
    const mockProduct = { id: 1, name: 'Product1', price: 100, description: 'Description1', quantity: 10 };
    const mockCreate = jest.spyOn(Product, 'create').mockResolvedValue(mockProduct as never);

    const product = await createProduct('Product1', 100, 'Description1', 10);
    expect(product).toEqual(mockProduct);
    expect(mockCreate).toHaveBeenCalledWith({ name: 'Product1', price: 100, description: 'Description1', quantity: 10 });
  });

  it('should get all products', async () => {
    const mockProducts = [
      { id: 1, name: 'Product1', price: 100, description: 'Description1', quantity: 10 },
      { id: 2, name: 'Product2', price: 200, description: 'Description2', quantity: 20 },
    ];
    const mockFindAll = jest.spyOn(Product, 'findAll').mockResolvedValue(mockProducts as never);

    const products = await getProducts();
    expect(products).toEqual(mockProducts);
    expect(mockFindAll).toHaveBeenCalled();
  });

  it('should update a product', async () => {
    const mockProduct = { id: 1, name: 'Product1', price: 100, description: 'Description1', quantity: 10, save: jest.fn() };
    const mockFindByPk = jest.spyOn(Product, 'findByPk').mockResolvedValue(mockProduct as never);

    const product = await updateProduct(1, 'Product1', 150, 'Description1 updated', 15);
    expect(product.name).toBe('Product1');
    expect(product.price).toBe(150);
    expect(product.description).toBe('Description1 updated');
    expect(product.quantity).toBe(15);
    expect(mockFindByPk).toHaveBeenCalledWith(1);
    expect(mockProduct.save).toHaveBeenCalled();
  });

  it('should delete a product', async () => {
    const mockProduct = { id: 1, destroy: jest.fn() };
    const mockFindByPk = jest.spyOn(Product, 'findByPk').mockResolvedValue(mockProduct as never);

    await deleteProduct(1);
    expect(mockFindByPk).toHaveBeenCalledWith(1);
    expect(mockProduct.destroy).toHaveBeenCalled();
  });
});

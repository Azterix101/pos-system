import { hash } from 'argon2';
import User from './models/user';
import Product from './models/product';
import Upsell from './models/upsell';
import Transaction from './models/transaction';
import sequelize from './utils/database';

const users = [
  { email: 'user1@example.com', password: 'password1' },
  { email: 'user2@example.com', password: 'password2' },
  { email: 'user3@example.com', password: 'password3' },
];

const products = [
  { name: 'Product 1', price: 10, description: 'Description for Product 1', quantity: 100 },
  { name: 'Product 2', price: 20, description: 'Description for Product 2', quantity: 100 },
  { name: 'Product 3', price: 30, description: 'Description for Product 3', quantity: 100 },
];

const upsells = [
  { productId: 1, upsellProductId: 2, createdAt: new Date(), updatedAt: new Date() },
  { productId: 2, upsellProductId: 3, createdAt: new Date(), updatedAt: new Date() },
  { productId: 3, upsellProductId: 1, createdAt: new Date(), updatedAt: new Date() },
];

const transactions = [
  { userId: 1, productId: 1, quantity: 1, totalAmount: 10, createdAt: new Date(), updatedAt: new Date() },
  { userId: 2, productId: 2, quantity: 1, totalAmount: 20, createdAt: new Date(), updatedAt: new Date() },
  { userId: 3, productId: 3, quantity: 1, totalAmount: 30, createdAt: new Date(), updatedAt: new Date() },
];

async function seedDatabase() {
  try {
    await sequelize.sync({ force: true });
    console.log('Database synchronized');

    const hashedUsers = await Promise.all(users.map(async (user) => {
      const hashedPassword = await hash(user.password);
      return { ...user, password: hashedPassword };
    }));

    await User.bulkCreate(hashedUsers);
    await Product.bulkCreate(products);
    await Upsell.bulkCreate(upsells);
    await Transaction.bulkCreate(transactions);

    console.log('Database seeded');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await sequelize.close();
  }
}

seedDatabase();

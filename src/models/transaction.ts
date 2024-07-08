import { DataTypes, Model } from 'sequelize';
import sequelize from '../utils/database';
import Product from './product';

class Transaction extends Model {
  public id!: number;

  public productId!: number;

  public quantity!: number;

  public totalAmount!: number;
}

Transaction.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  productId: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      isInt: { msg: 'Quantity must be an integer' },
    },
  },
  totalAmount: {
    type: DataTypes.FLOAT,
    allowNull: false,
    validate: {
      isFloat: { msg: 'Total amount must be a number' },
    },
  },
}, {
  sequelize,
  modelName: 'transaction',
  tableName: 'transactions',
  timestamps: true,
  indexes: [
    {
      fields: ['productId'],
    },
  ],
});

Transaction.belongsTo(Product, { foreignKey: 'productId' });

export default Transaction;

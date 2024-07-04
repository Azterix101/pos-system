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
  },
  totalAmount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'transaction',
  tableName: 'transactions',
});

Transaction.belongsTo(Product, { foreignKey: 'productId' });

export default Transaction;

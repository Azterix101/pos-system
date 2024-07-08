import { DataTypes, Model } from 'sequelize';
import sequelize from '../utils/database';

class Product extends Model {
  public id!: number;

  public name!: string;

  public price!: number;

  public description!: string;

  public quantity!: number;
}

Product.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
    validate: {
      isFloat: { msg: 'Price must be a number' },
    },
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'No description available', // Adding default value
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      isInt: { msg: 'Quantity must be an integer' },
    },
  },
}, {
  sequelize,
  modelName: 'product',
  tableName: 'products',
  timestamps: true,
  indexes: [
    {
      unique: true,
      fields: ['name'],
    },
  ],
});

export default Product;

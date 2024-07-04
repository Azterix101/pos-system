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
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'No description available', // Adding default value
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'product',
  tableName: 'products',
});

export default Product;

import { DataTypes, Model } from 'sequelize';
import sequelize from '../utils/database';
import Product from './product';

class Upsell extends Model {
  public id!: number;

  public productId!: number;

  public upsellProductId!: number;
}

Upsell.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  productId: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
  },
  upsellProductId: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'upsell',
  tableName: 'upsells',
});

Upsell.belongsTo(Product, { foreignKey: 'productId' });
Upsell.belongsTo(Product, { foreignKey: 'upsellProductId', as: 'upsellProduct' });

export default Upsell;

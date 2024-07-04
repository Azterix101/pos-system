import { DataTypes, Model } from 'sequelize';
import sequelize from '../utils/database';

class User extends Model {
  public id!: number;

  public email!: string;

  public password!: string;
}

User.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: {
        msg: 'Must be a valid email address',
      },
      notEmpty: {
        msg: 'Email address is required',
      },
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'user',
  tableName: 'users',
});

export default User;

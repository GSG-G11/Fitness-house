import { DataTypes } from 'sequelize';
import sequelize from '../config/connection';

const Subscription = sequelize.define('subscriptions', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
    values: ['one', 'six'],
  },
  status: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
});

export default Subscription;

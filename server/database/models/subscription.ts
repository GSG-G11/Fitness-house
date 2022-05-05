import { DataTypes } from 'sequelize';
import sequelize from '../config/connection';

const Subscription = sequelize.define('subscriptions', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  type: {
    type: DataTypes.ENUM,
    allowNull: false,
    values: ['month', 'sixMonth'],
  },
  status: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
});

export default Subscription;

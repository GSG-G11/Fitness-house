import { DataTypes } from 'sequelize';
import { SubscriptionModel } from '../../utils';
import sequelize from '../config/connection';

const Subscription = sequelize.define<SubscriptionModel>('subscriptions', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userPhone: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
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

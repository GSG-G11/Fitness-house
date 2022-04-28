import { DataTypes } from 'sequelize';
import sequelize from '../config/connection';

const Image = sequelize.define('images', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  gym_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  pathUrl: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  publicKey: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default Image;

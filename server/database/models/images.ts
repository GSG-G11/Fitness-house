import { DataTypes } from 'sequelize';
import sequelize from '../config/connection';

// Model Image has a reference to Gym model called "gymId"
const Image = sequelize.define('images', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
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

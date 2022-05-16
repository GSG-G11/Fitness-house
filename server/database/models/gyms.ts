import { DataTypes } from 'sequelize';
import sequelize from '../config/connection';

const Gym = sequelize.define('gyms', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  gymName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  logo: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  typeGender: {
    type: DataTypes.ENUM('male', 'female', 'mixed'),
    allowNull: false,
  },
  monthlyPrice: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  sixMonthPrice: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  fulltime: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  features: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: false,
  },
});

export default Gym;

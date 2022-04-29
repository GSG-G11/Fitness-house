import Gym from './gyms';
import Image from './images';
import User from './users';

Gym.hasMany(Image, {
  foreignKey: 'gymId',
  as: 'images',
});
Image.belongsTo(Gym, {
  foreignKey: 'gymId',
  as: 'gym',
});

export { User, Gym, Image };

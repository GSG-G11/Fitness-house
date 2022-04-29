import Gym from './gyms';
import Image from './images';
import User from './user';
import Subscription from './subscription';
import Reviews from './reviews';

Gym.hasMany(Image, {
  foreignKey: 'gymId',
  as: 'images',
});
Image.belongsTo(Gym, {
  foreignKey: 'gymId',
  as: 'gym',
});

User.hasMany(Subscription, {
  foreignKey: 'userId',
  as: 'subscriptions',
});
Subscription.belongsTo(User, {
  foreignKey: 'userId',
  as: 'users',
});

Gym.hasMany(Subscription, {
  foreignKey: 'gymId',
  as: 'subscriptions',
});
Subscription.belongsTo(Gym, {
  foreignKey: 'gymId',
  as: 'gyms',
});

User.hasMany(Reviews, {
  foreignKey: 'userId',
  as: 'reviews',
});
Reviews.belongsTo(User, {
  foreignKey: 'userId',
  as: 'users',
});

Gym.hasMany(Reviews, {
  foreignKey: 'gymId',
  as: 'reviews',
});
Reviews.belongsTo(Gym, {
  foreignKey: 'gymId',
  as: 'gyms',
});

export {
  User, Gym, Image, Subscription, Reviews,
};

import Gym from './gyms';
import Image from './images';
import User from './users';
import Subscription from './subscription';
import Review from './reviews';

Gym.hasMany(Image);
Image.belongsTo(Gym);

User.hasMany(Subscription);
Subscription.belongsTo(User);

Gym.hasMany(Subscription);
Subscription.belongsTo(Gym);

User.hasMany(Review);
Review.belongsTo(User);

Gym.hasMany(Review);
Review.belongsTo(Gym);

export { User, Gym, Image, Subscription, Review };

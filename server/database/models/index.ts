import Gym from './gyms';
import Image from './images';
import User from './users';
import Subscription from './subscription';
import Reviews from './reviews';

Gym.hasMany(Image);
Image.belongsTo(Gym);

User.hasMany(Subscription);
Subscription.belongsTo(User);

Gym.hasMany(Subscription);
Subscription.belongsTo(Gym);

User.hasMany(Reviews);
Reviews.belongsTo(User);

Gym.hasMany(Reviews);
Reviews.belongsTo(Gym);

export { User, Gym, Image, Subscription, Reviews };

import Gym from './gyms';
import Image from './images';
import User from './users';
import Subscription from './subscription';
import Review from './reviews';

// Gyms has many images and images belong to gyms
Gym.hasMany(Image);
Image.belongsTo(Gym);

// Users has many Subscriptions and Subscriptions belong to users
User.hasMany(Subscription);
Subscription.belongsTo(User);

// Gyms has many Subscriptions and Subscriptions belong to gyms
Gym.hasMany(Subscription);
Subscription.belongsTo(Gym);

// User has many Reviews and Reviews belong to gyms
User.hasMany(Review);
Review.belongsTo(User);

// Gym has many Reviews and Reviews belong to gyms
Gym.hasMany(Review);
Review.belongsTo(Gym);

export { User, Gym, Image, Subscription, Review };

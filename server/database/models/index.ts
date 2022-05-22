import Gym from './gyms';
import Image from './images';
import Subscription from './subscription';
import Review from './reviews';

// Gyms has many images and images belong to gyms
Gym.hasMany(Image);
Image.belongsTo(Gym);

// Gyms has many Subscriptions and Subscriptions belong to gyms
Gym.hasMany(Subscription);
Subscription.belongsTo(Gym);

// Gym has many Reviews and Reviews belong to gyms
Gym.hasMany(Review);
Review.belongsTo(Gym);

export { Gym, Image, Subscription, Review };

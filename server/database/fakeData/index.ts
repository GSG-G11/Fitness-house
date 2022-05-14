import sequelize from '../config/connection';
import { Gym, Image, Review, Subscription, User } from '../models';

import * as usersJson from './users.json';
import * as gymsJson from './gyms.json';
import * as imagesJson from './images.json';
import * as reviewsJson from './reviews.json';
import * as subscriptionsJson from './subscriptions.json';

const { gyms } = gymsJson;
const { users } = usersJson;
const { images } = imagesJson;
const { reviews } = reviewsJson;
const { subscription } = subscriptionsJson;

const builderHandler = async () => {
  await sequelize.sync({ force: true });

  console.log('Database Start seeded (user - gym) ...');

  await Promise.all([
    ...users.map(async (user: any) => await User.create(user)),
    ...gyms.map(async (gym: any) => await Gym.create(gym)),
  ]);

  console.log(
    'Insert Users and Gyms ~~ Now Database Start seeded (images - subscription - reviews) ...',
  );

  await Promise.all([
    ...images.map(async (image: any) => await Image.create(image)),
    ...subscription.map(async (sub: any) => await Subscription.create(sub)),
    ...reviews.map(async (review: any) => await Review.create(review)),
  ]);

  console.log('Database seeded successfully');
};

if (process.env.NODE_ENV !== 'test') {
  builderHandler();
}

export default builderHandler;

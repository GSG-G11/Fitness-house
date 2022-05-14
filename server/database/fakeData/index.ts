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
    ...users.map(async (user: any) => await User.bulkCreate([user])),
    ...gyms.map(async (gym: any) => await Gym.bulkCreate([gym])),
  ]);

  console.log(
    'Insert Users and Gyms ~~ Now Database Start seeded (images - subscription - reviews) ...',
  );

  await Promise.all([
    ...images.map(async (image: any) => await Image.bulkCreate([image])),
    ...subscription.map(async (sub: any) => await Subscription.bulkCreate([sub])),
    ...reviews.map(async (review: any) => await Review.bulkCreate([review])),
  ]);

  console.log('Database seeded successfully');
};

if (process.env.NODE_ENV !== 'test') {
  builderHandler();
}

export default builderHandler;

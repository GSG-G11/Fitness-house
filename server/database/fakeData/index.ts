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

  await Promise.all([...(await User.bulkCreate(users)), ...(await Gym.bulkCreate(gyms))]);

  console.log(
    'Insert Users and Gyms ~~ Now Database Start seeded (images - subscription - reviews) ...',
  );

  await Promise.all([
    ...(await Image.bulkCreate(images)),
    ...(await Subscription.bulkCreate(subscription)),
    ...(await Review.bulkCreate(reviews)),
  ]);

  console.log('Database seeded successfully');
};

if (process.env.NODE_ENV !== 'test') {
  builderHandler();
}

export default builderHandler;

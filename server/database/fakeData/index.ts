import sequelize from '../config/connection';
import { Gym, Image, Review, User } from '../models';

import * as usersJson from './users.json';
import * as gymsJson from './gyms.json';
import * as imagesJson from './images.json';
import * as reviewsJson from './reviews.json';

const { gyms } = gymsJson;
const { users } = usersJson;
const { images } = imagesJson;
const { reviews } = reviewsJson;

const builderHandler = async () => {
  await sequelize.sync({ force: true });

  console.log('Database Start seeded ...');

  await Promise.all([
    users.map((user: any) => User.create(user)),
    gyms.map((gym: any) => Gym.create(gym)),
    images.map((image: any) => Image.create(image)),
    reviews.map((review: any) => Review.create(review)),
  ]);

  console.log('Database seeded successfully');
};

if (process.env.NODE_ENV !== 'test') {
  builderHandler();
}

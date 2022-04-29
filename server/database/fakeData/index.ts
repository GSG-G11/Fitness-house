import sequelize from '../config/connection';
import { Gym, Image, User } from '../models';

import * as usersJson from './users.json';
import * as gymsJson from './gyms.json';
import * as imagesJson from './images.json';

const { gyms } = gymsJson;
const { users } = usersJson;
const { images } = imagesJson;

const builderHandler = async () => {
  await sequelize.sync({ force: true });

  console.log('Database Start seeded ...');

  await Promise.all([
    users.map((user: any) => User.create(user)),
    gyms.map((gym: any) => Gym.create(gym)),
    images.map((image: any) => Image.create(image)),
  ]);

  console.log('Database seeded successfully');
};

if (process.env.NODE_ENV !== 'test') {
  builderHandler();
}

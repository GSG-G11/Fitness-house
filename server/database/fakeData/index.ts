import sequelize from '../config/connection';
import { Gym } from '../models';

import * as gymsJson from './gyms.json';

const { gyms } = gymsJson;

const builderHandler = async () => {
  await sequelize.sync({ force: true });

  await Promise.all([gyms.map((gym: any) => Gym.create(gym))]);
  console.log('Database seeded successfully');
};

if (process.env.NODE_ENV !== 'test') {
  builderHandler();
}

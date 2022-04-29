import { Sequelize } from 'sequelize';

require('env2')('.env');

const { NODE_ENV, DB_URL, TEST_DB_URL, DATABASE_URL } = process.env;

let dbUrl: string = '';
let sslConnection: boolean | object = false;

switch (NODE_ENV) {
  case 'dev':
    dbUrl = DB_URL!;
    sslConnection = false;
    break;
  case 'test':
    dbUrl = TEST_DB_URL!;
    sslConnection = false;
    break;
  case 'production':
    dbUrl = DATABASE_URL!;
    sslConnection = { rejectUnauthorized: true };
    break;
  default:
    throw new Error('NODE_ENV is not set');
}

const sequelize = new Sequelize(dbUrl, {
  dialect: 'postgres',
  dialectOptions: { sslConnection, charset: 'utf8' },
  logging: false,
});

export default sequelize;

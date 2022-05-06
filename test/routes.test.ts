import request from 'supertest';
import app from '../server/app';
import buildDB from '../server/database/fakeData/index';
import connection from '../server/database/config/connection';

beforeAll(() => buildDB());

describe('Gyms API', () => {
  test('Gyms - GET - /api/v1/gyms/top - ', async () => {
    const response = await request(app).get('/api/v1/gyms/top').expect(200);
    expect(response.body.topReviewGyms.length).toBe(3);
  });
});

afterAll(() => {
  connection.close();
});

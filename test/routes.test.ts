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
  test('Gyms - GET - /api/v1/gyms/:id - ', async () => {
    const response = await request(app).get('/api/v1/gyms/1').expect(200);
    expect(response.body.GymData.length).toBe(1);
  });
  test('Gyms - GET - /api/v1/gyms/:id - ', async () => {
    const response = await request(app).get('/api/v1/gyms/2').expect(200);
    expect(response.body.GymData.length).toBe(1);
  });
  test('Gyms - GET - /api/v1/gyms/:id - ', async () => {
    const response = await request(app).get('/api/v1/gyms/3').expect(200);
    expect(response.body.GymData.length).toBe(1);
  });
  test('Gyms - GET - /api/v1/gyms/:id - ', async () => {
    const response = await request(app).get('/api/v1/gyms/4').expect(200);
    expect(response.body.GymData.length).toBe(1);
  });
  test('Gyms - GET - /api/v1/gyms/:id - ', async () => {
    const response = await request(app).get('/api/v1/gyms/5').expect(200);
    expect(response.body.GymData.length).toBe(1);
  });

  test('Gyms - GET - /api/v1/gyms/:id - ', async () => {
    const response = await request(app).get('/api/v1/gyms/50').expect(200);
    expect(response.body.GymData.length).toBe(0);
  });
  test('Gyms - GET - /api/v1/gyms/:id - ', async () => {
    const response = await request(app).get('/api/v1/gyms/gggggggg').expect(500);
  });
});

afterAll(() => {
  connection.close();
});

import request from 'supertest';
import app from '../server/app';
import buildDB from '../server/database/fakeData/index';
import connection from '../server/database/config/connection';

const review = {
    gymId: 2,
    username: 'ali',
    userPhone: '0592157001',
    type: 'month',
    rate: 3.5,
  };
  
  const nonActive = {
    gymId: 2,
    username: 'ali',
    userPhone: '0595562392',
    type: 'month',
    rate: 3.5,
  };
  
  const newSubscription = {
    gymId: 1,
    username: 'ali',
    userPhone: '0592157001',
    type: 'month',
  };

  beforeAll(() => buildDB());
  describe('Revieq Gyms API Testing', () => {
    test('POST: Test route Create new subscription ~~ path ==> /api/v1/subscriptions - Success', async () => {
      const response = await request(app)
      .post('/api/v1/subscriptions')
      .send(newSubscription)
        expect(response.status).toBe(201);
        expect(response.body.message).toBe('تم الاشتراك بنجاح');
    });
    test('POST: Test route Create new Review ~~ path ==> /api/v1/gyms/reviews - Failed ', async () => {
      const response = await request(app)
        .post('/api/v1/gyms/reviews')
        .send(nonActive)
        .expect(400);
      expect(response.body.status).toBe(400);
    });
  
    test('POST: Test route Create new Review ~~ Empty Input ~~ path ==> /api/v1/gyms/reviews - Failed ', async () => {
      const response = await request(app).post('/api/v1/gyms/reviews').send({}).expect(400);
      expect(response.body.status).toBe(400);
    });
  
    test('POST: Test route Create new Review just with gymId ~~ path ==> /api/v1/gyms/reviews - Failed ', async () => {
      const response = await request(app)
        .post('/api/v1/gyms/reviews')
        .send({ gymId: 1 })
        .expect(400);
      expect(response.body.status).toBe(400);
    });
  }
    );
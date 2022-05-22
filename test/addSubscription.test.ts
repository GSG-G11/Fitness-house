import request from 'supertest';
import app from '../server/app';
import buildDB from '../server/database/fakeData/index';
import connection from '../server/database/config/connection';

const newSubscription = {
  gymId: 1,
  username: 'ali',
  userPhone: '0592157001',
  type: 'month',
};

const existSubscription = {
  gymId: 1,
  username: 'محمود علي',
  userPhone: '0591234567',
  type: 'month',
};

const FailedNewSubscription = {
  gymId: 1,
  username: 'ali',
  userPhone: '0592157w10',
  type: 'any text',
};

beforeAll(() => buildDB());

describe('Subscription Gyms API Testing', () => {
  test('POST: Test route Create new Subscription ~~ path ==> /api/v1/subscriptions - Success', async () => {
    const response = await request(app)
      .post('/api/v1/subscriptions')
      .send(newSubscription)
      .expect(201);
    expect(response.body.message).toBe('تم الاشتراك بنجاح');
    expect(response.body.subscription.type).toBe('month');
    expect(response.body.subscription.status).toBe(false);
  });

  test('POST: Test route Create new Subscription ~~ path ==> /api/v1/subscriptions - Failed ', async () => {
    const response = await request(app)
      .post('/api/v1/subscriptions')
      .send(FailedNewSubscription)
      .expect(400);
    expect(response.body.status).toBe(400);
  });

  test('POST: Test route Create new Subscription ~~ Empty Input ~~ path ==> /api/v1/subscriptions - Failed ', async () => {
    const response = await request(app).post('/api/v1/subscriptions').send({}).expect(400);
    expect(response.body.status).toBe(400);
  });

  test('POST: Test route Create new Subscription just with gymId ~~ path ==> /api/v1/subscriptions - Failed ', async () => {
    const response = await request(app)
      .post('/api/v1/subscriptions')
      .send({ gymId: 1 })
      .expect(400);
    expect(response.body.status).toBe(400);
  });

  test('POST: Test route Create new Subscription just with username ~~ path ==> /api/v1/subscriptions - Failed ', async () => {
    const response = await request(app)
      .post('/api/v1/subscriptions')
      .send({
        username: 'ali',
      })
      .expect(400);
    expect(response.body.status).toBe(400);
  });

  test('POST: Test route Create new Subscription just with userPhone ~~ path ==> /api/v1/subscriptions - Failed ', async () => {
    const response = await request(app)
      .post('/api/v1/subscriptions')
      .send({
        userPhone: '0592157w10',
      })
      .expect(400);
    expect(response.body.status).toBe(400);
  });

  test('POST: Test route Create new Subscription just with type ~~ path ==> /api/v1/subscriptions - Failed ', async () => {
    const response = await request(app)
      .post('/api/v1/subscriptions')
      .send({
        type: 'sixMonth',
      })
      .expect(400);
    expect(response.body.status).toBe(400);
  });

  test('POST: Test route Create new Subscription User Phone is Exit ~~ path ==> /api/v1/subscriptions - Failed ', async () => {
    const response = await request(app)
      .post('/api/v1/subscriptions')
      .send(existSubscription)
      .expect(409);
    expect(response.body.status).toBe(409);
    expect(response.body.message).toBe(
      'عذرا هذا تم الاشتراك من قبل هذا الهاتف مسبقا ! حاول مرة أخرى',
    );
  });
});
afterAll(() => {
  connection.close();
});

import request from 'supertest';
import app from '../server/app';
import buildDB from '../server/database/fakeData/index';
import connection from '../server/database/config/connection';

beforeAll(() => buildDB());

describe('Subscription Gyms API Testing', () => {
  test('PUT: test route get single gym ~~ path ==> /api/v1/gym/subscription/:id ~~ id = 1 - not Found ', async () => {
    const response = await request(app)
      .put('/api/v1/gym/subscription/1')
      .set('Cookie', [`token= ${process.env.GYM_TOKEN}`])
      .expect(404);
    expect(response.body.status).toBe(404);
    expect(response.body.message).toBe('عذرا , هذا الاشتراك , غير موجود');
  });

  test('PUT: test route get single gym ~~ path ==> /api/v1/gym/subscription/:id ~~ id = 3 ', async () => {
    const response = await request(app)
      .put('/api/v1/gym/subscription/3')
      .set('Cookie', [`token= ${process.env.GYM_TOKEN}`])
      .expect(200);
    expect(response.body.subscription.status).toBe(false);
    expect(response.body.message).toBe('تم إيقاف الاشتراك بنجاح');
  });

  test('PUT: test route get single gym ~~ path ==> /api/v1/gym/subscription/:id ~~ id = 4 ', async () => {
    const response = await request(app)
      .put('/api/v1/gym/subscription/4')
      .set('Cookie', [`token= ${process.env.GYM_TOKEN}`])
      .expect(200);
    expect(response.body.subscription.status).toBe(true);
    expect(response.body.message).toBe(
      'تم تفعيل الاشتراك بحزمة ستة شهور بنجاح , يرجى زيارة  النادي غداً لتأكيد الإشتراك',
    );
  });

  test('PUT: test route get single gym ~~ path ==> /api/v1/gym/subscription/:id ~~ id = daw - Failed', async () => {
    const response = await request(app)
      .put('/api/v1/gym/subscription/dwa')
      .set('Cookie', [`token= ${process.env.GYM_TOKEN}`])
      .expect(400);
  });
});
afterAll(() => {
  connection.close();
});

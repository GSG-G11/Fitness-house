import request from 'supertest';
import app from '../server/app';
import buildDB from '../server/database/fakeData/index';
import connection from '../server/database/config/connection';

beforeAll(() => buildDB());

describe('Gyms API Testing', () => {
  test('GET: test route get single gym ~~ path ==> /api/v1/gyms/{id} ~~ id = 2 ', async () => {
    const response = await request(app).get('/api/v1/gyms/2').expect(200);
    expect(response.body.gymData.gymName).toBe('Technogym gaza تكنو جيم');
    expect(response.body.gymData.city).toBe('غزة');
  });

  test('GET: test route get single gym ~~ path ==> /api/v1/gyms/{id} ~~ id = 3 ', async () => {
    const response = await request(app).get('/api/v1/gyms/3').expect(200);
    expect(response.body.gymData.gymName).toBe('اوكسجن جيم');
    expect(response.body.gymData.city).toBe('رفح');
  });

  test('GET: test route get single gym ~~ path ==> /api/v1/gyms/{id} ~~ id = 4 ', async () => {
    const response = await request(app).get('/api/v1/gyms/4').expect(200);
    expect(response.body.gymData.gymName).toBe('مركز الملكة الأنيقة للسيدات');
    expect(response.body.gymData.city).toBe('غزة');
  });

  test('GET: test route get single gym ~~ path ==> /api/v1/gyms/{id} ~~ id = 5 ', async () => {
    const response = await request(app).get('/api/v1/gyms/5').expect(200);
    expect(response.body.gymData.gymName).toBe('Jalaa Gym -جيم نادي الجلاء');
    expect(response.body.gymData.city).toBe('غزة');
  });

  test('GET: test route get single gym  ~~ path ==> /api/v1/gyms/{id} ~~ id = 50 ~~ This ID is not Exist', async () => {
    const response = await request(app).get('/api/v1/gyms/50').expect(404);
    expect(response.body.message).toBe('عذراُ الجيم غير متوفر');
  });

  test('GET: test route get single gym ~~ path ==> /api/v1/gyms/{id} ~~ id = invalidID ~~ This ID is invalid id must be number ', async () => {
    const response = await request(app).get('/api/v1/gyms/invalidID').expect(400);
    expect(response.body.message).toBe('عذراً خطأ في المعرف');
  });
});
afterAll(() => {
  connection.close();
});

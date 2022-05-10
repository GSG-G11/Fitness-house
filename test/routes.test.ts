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
    expect(response.body.gymData.gymName).toBe('نادي فريندز للياقة البدنية');
    expect(response.body.gymData.city).toBe('غزة');
  });

  test('Gyms - GET - /api/v1/gyms/:id - ', async () => {
    const response = await request(app).get('/api/v1/gyms/2').expect(200);
    expect(response.body.gymData.gymName).toBe('Technogym gaza تكنو جيم');
    expect(response.body.gymData.city).toBe('غزة');
  });

  test('Gyms - GET - /api/v1/gyms/:id - ', async () => {
    const response = await request(app).get('/api/v1/gyms/3').expect(200);
    expect(response.body.gymData.gymName).toBe('اوكسجن جيم');
    expect(response.body.gymData.city).toBe('رفح');
  });

  test('Gyms - GET - /api/v1/gyms/:id - ', async () => {
    const response = await request(app).get('/api/v1/gyms/4').expect(200);
    expect(response.body.gymData.gymName).toBe('مركز الملكة الأنيقة للسيدات');
    expect(response.body.gymData.city).toBe('غزة');
  });

  test('Gyms - GET - /api/v1/gyms/:id - ', async () => {
    const response = await request(app).get('/api/v1/gyms/5').expect(200);
    expect(response.body.gymData.gymName).toBe('Jalaa Gym -جيم نادي الجلاء');
    expect(response.body.gymData.city).toBe('غزة');
  });

  test('Gyms - GET - /api/v1/gyms/:id - ', async () => {
    const response = await request(app).get('/api/v1/gyms/50').expect(404);
    expect(response.body.message).toBe('عذراُ الجيم غير متوفر');
  });

  test('Gyms - GET - /api/v1/gyms/:id - ', async () => {
    const response = await request(app).get('/api/v1/gyms/gggggggg').expect(400);
    expect(response.body.message).toBe('عذراً خطأ في المعرف');
  });

  test('Gyms Filter  - GET - /api/v1/gyms/filter  ', async () => {
    const response = await request(app).get('/api/v1/gyms/filter').expect(200);
    expect(response.body.pages.totalItems).toBe(5);
    expect(response.body.pages.pageSize).toBe(3);
    expect(response.body.gyms[0].id).toBe(3);
  });

  test('Gyms Filter  - GET - /api/v1/gyms/filter?name=tec  ', async () => {
    const response = await request(app).get('/api/v1/gyms/filter?name=tec').expect(200);
    expect(response.body.pages.totalItems).toBe(1);
    expect(response.body.pages.pageSize).toBe(3);
    expect(response.body.gyms[0].id).toBe(2);
  });

  test('Gyms Filter  - GET - /api/v1/gyms/filter?name=tec&city=غزة', async () => {
    const response = await request(app)
      .get('/api/v1/gyms/filter?name=tec&city=%D8%BA%D8%B2%D8%A9')
      .expect(200);
    expect(response.body.pages.totalItems).toBe(1);
    expect(response.body.pages.pageSize).toBe(3);
    expect(response.body.gyms[0].id).toBe(2);
  });

  test('Gyms Filter  - GET - /api/v1/gyms/filter?name=ال&city=غزة&typeGender=mail', async () => {
    const response = await request(app)
      .get('/api/v1/gyms/filter?name=%D8%A7%D9%84&city=%D8%BA%D8%B2%D8%A9&typeGender=mail')
      .expect(200);
    expect(response.body.pages.totalItems).toBe(1);
    expect(response.body.pages.pageSize).toBe(3);
    expect(response.body.gyms[0].id).toBe(1);
  });

  test('Gyms Filter  - GET - /api/v1/gyms/filter?name=ال&city=غزة&typeGender=mail&minPrice=10&maxPrice=350', async () => {
    const response = await request(app)
      .get(
        '/api/v1/gyms/filter?name=%D8%A7%D9%84&city=%D8%BA%D8%B2%D8%A9&typeGender=mail&minPrice=10&maxPrice=350',
      )
      .expect(200);
    expect(response.body.pages.totalItems).toBe(1);
    expect(response.body.pages.pageSize).toBe(3);
    expect(response.body.gyms[0].gymName).toBe('نادي فريندز للياقة البدنية');
  });

  test('Gyms Filter  - GET - /api/v1/gyms/filter?name=ال&city=غزة&typeGender=mail&minPrice=10&maxPrice=350&availability=true', async () => {
    const response = await request(app)
      .get(
        '/api/v1/gyms/filter?name=%D8%A7%D9%84&city=%D8%BA%D8%B2%D8%A9&typeGender=mail&minPrice=10&maxPrice=350&availability=true',
      )
      .expect(200);
    expect(response.body.pages.totalItems).toBe(1);
    expect(response.body.pages.pageSize).toBe(3);
    expect(response.body.gyms[0].gymName).toBe('نادي فريندز للياقة البدنية');
    expect(response.body.gyms[0].fulltime).toBe(true);
  });

  test('Gyms Filter - GET - /api/v1/gyms/filter?page=2', async () => {
    const response = await request(app).get('/api/v1/gyms/filter?page=2').expect(200);
    expect(response.body.gyms[0].id).toBe(4);
    expect(response.body.gyms[0].gymName).toBe('مركز الملكة الأنيقة للسيدات');
    expect(response.body.pages.pageSize).toBe(3);
    expect(response.body.pages.totalItems).toBe(5);
    expect(response.body.pages.currentPage).toBe(2);
  });

  test('Gyms Filter - GET - /api/v1/gyms/filter?features=ميدان%20تنافسي', async () => {
    const response = await request(app)
      .get(
        '/api/v1/gyms/filter?features=%D9%85%D9%8A%D8%AF%D8%A7%D9%86%20%D8%AA%D9%86%D8%A7%D9%81%D8%B3%D9%8A',
      )
      .expect(200);
    expect(response.body.gyms[0].id).toBe(2);
    expect(response.body.gyms[0].gymName).toBe('Technogym gaza تكنو جيم');
    expect(response.body.gyms[0].features[1]).toBe('ميدان تنافسي');
    expect(response.body.pages.pageSize).toBe(3);
    expect(response.body.pages.totalItems).toBe(2);
  });

  test('Gyms Filter - GET - /api/v1/gyms/filter?page=-2', async () => {
    const response = await request(app)
      .get('/api/v1/gyms/filter?page=-2')
      .expect(400);
    expect(response.body.status).toBe(400);
    expect(response.body.message).toBe('عذراً خطأ في السعر أو رقم الصفحة , يجب أن يكون رقماً');
  });
});
afterAll(() => {
  connection.close();
});

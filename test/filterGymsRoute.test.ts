import request from 'supertest';
import app from '../server/app';
import buildDB from '../server/database/fakeData/index';
import connection from '../server/database/config/connection';

beforeAll(() => buildDB());

describe('Gyms API Testing - Filtering', () => {
  test('GET: test route filter gyms use query string ~~ path ==> /api/v1/gyms/filter  ', async () => {
    const response = await request(app).get('/api/v1/gyms/filter').expect(200);
    expect(response.body.pagination.totalItems).toBe(5);
    expect(response.body.pagination.pageSize).toBe(3);
    expect(response.body.gyms[0].id).toBe(3);
  });

  test('GET: test route filter gyms use query string ~~ path ==> /api/v1/gyms/filter?name=tec  ', async () => {
    const response = await request(app).get('/api/v1/gyms/filter?name=tec').expect(200);
    expect(response.body.pagination.totalItems).toBe(1);
    expect(response.body.pagination.pageSize).toBe(3);
    expect(response.body.gyms[0].id).toBe(2);
  });

  test('GET: test route filter gyms use query string ~~ path ==> /api/v1/gyms/filter?name=tec&city=غزة', async () => {
    const response = await request(app)
      .get('/api/v1/gyms/filter?name=tec&city=%D8%BA%D8%B2%D8%A9')
      .expect(200);
    expect(response.body.pagination.totalItems).toBe(1);
    expect(response.body.pagination.pageSize).toBe(3);
    expect(response.body.gyms[0].id).toBe(2);
  });

  test('GET: test route filter gyms use query string ~~ path ==> /api/v1/gyms/filter?name=ال&city=غزة&typeGender=mail', async () => {
    const response = await request(app)
      .get('/api/v1/gyms/filter?name=%D8%A7%D9%84&city=%D8%BA%D8%B2%D8%A9&typeGender=mail')
      .expect(200);
    expect(response.body.pagination.totalItems).toBe(1);
    expect(response.body.pagination.pageSize).toBe(3);
    expect(response.body.gyms[0].id).toBe(1);
  });

  test('GET: test route filter gyms use query string ~~ path ==> /api/v1/gyms/filter?name=ال&city=غزة&typeGender=mail&minPrice=10&maxPrice=350', async () => {
    const response = await request(app)
      .get(
        '/api/v1/gyms/filter?name=%D8%A7%D9%84&city=%D8%BA%D8%B2%D8%A9&typeGender=mail&minPrice=10&maxPrice=350',
      )
      .expect(200);
    expect(response.body.pagination.totalItems).toBe(1);
    expect(response.body.pagination.pageSize).toBe(3);
    expect(response.body.gyms[0].gymName).toBe('نادي فريندز للياقة البدنية');
  });

  test('GET: test route filter gyms use query string ~~ path ==> /api/v1/gyms/filter?name=ال&city=غزة&typeGender=mail&minPrice=10&maxPrice=350&availability=true', async () => {
    const response = await request(app)
      .get(
        '/api/v1/gyms/filter?name=%D8%A7%D9%84&city=%D8%BA%D8%B2%D8%A9&typeGender=mail&minPrice=10&maxPrice=350&availability=true',
      )
      .expect(200);
    expect(response.body.pagination.totalItems).toBe(1);
    expect(response.body.pagination.pageSize).toBe(3);
    expect(response.body.gyms[0].gymName).toBe('نادي فريندز للياقة البدنية');
    expect(response.body.gyms[0].fulltime).toBe(true);
  });

  test('GET: test route filter gyms use query string ~~ path ==> /api/v1/gyms/filter?page=2', async () => {
    const response = await request(app).get('/api/v1/gyms/filter?page=2').expect(200);
    expect(response.body.gyms[0].id).toBe(4);
    expect(response.body.gyms[0].gymName).toBe('مركز الملكة الأنيقة للسيدات');
    expect(response.body.pagination.pageSize).toBe(3);
    expect(response.body.pagination.totalItems).toBe(5);
    expect(response.body.pagination.currentPage).toBe(2);
  });

  test('GET: test route filter gyms use query string ~~ path ==> /api/v1/gyms/filter?features=ميدان%20تنافسي', async () => {
    const response = await request(app)
      .get(
        '/api/v1/gyms/filter?features=%D9%85%D9%8A%D8%AF%D8%A7%D9%86%20%D8%AA%D9%86%D8%A7%D9%81%D8%B3%D9%8A',
      )
      .expect(200);
    expect(response.body.gyms[0].id).toBe(2);
    expect(response.body.gyms[0].gymName).toBe('Technogym gaza تكنو جيم');
    expect(response.body.gyms[0].features[1]).toBe('ميدان تنافسي');
    expect(response.body.pagination.pageSize).toBe(3);
    expect(response.body.pagination.totalItems).toBe(2);
  });

  test('GET: test route filter gyms use query string ~~ path ==> /api/v1/gyms/filter?page=-2', async () => {
    const response = await request(app).get('/api/v1/gyms/filter?page=-2').expect(400);
    expect(response.body.status).toBe(400);
    expect(response.body.message).toBe('عذراً خطأ في السعر أو رقم الصفحة , يجب أن يكون رقماً');
  });

  test('GET: test route filter gyms use query string ~~ path ==> /api/v1/gyms/filter?name=ا&city=غزة&typeGender=mail&minPrice=10&maxPrice=150&availability=true&page=1&features=ميدان%20تنافسي&review=1', async () => {
    const response = await request(app)
      .get(
        '/api/v1/gyms/filter?name=%D8%A7&city=%D8%BA%D8%B2%D8%A9&typeGender=mail&minPrice=10&maxPrice=150&availability=true&page=1&features=%D9%85%D9%8A%D8%AF%D8%A7%D9%86%20%D8%AA%D9%86%D8%A7%D9%81%D8%B3%D9%8A&review=1',
      )
      .expect(200);
    expect(response.body.gyms[0].id).toBe(1);
    expect(response.body.gyms[0].gymName).toBe('نادي فريندز للياقة البدنية');
    expect(response.body.gyms[0].city).toBe('غزة');
    expect(response.body.gyms[0].typeGender).toBe('mail');
    expect(response.body.gyms[0].features[0]).toBe('ميدان تنافسي');
    expect(response.body.pagination.pageSize).toBe(3);
    expect(response.body.pagination.totalItems).toBe(1);
    expect(response.body.pagination.currentPage).toBe(1);
  });
});
afterAll(() => {
  connection.close();
});

import request from 'supertest';
import app from '../server/app';
import buildDB from '../server/database/fakeData/index';
import connection from '../server/database/config/connection';

beforeAll(() => buildDB());

const newGym = {
  gymName: 'first gym',
  email: 'first.g.new@gmail.com',
  password: 'first.g.new@gmail.com',
  phone: '0592157001',
  city: 'gaza',
  description: 'test desc',
  typeGender: 'male',
  monthlyPrice: 12.21,
  sixMonthPrice: 120.556,
  fulltime: true,
  features: ['test 1', 'test 2'],
  logo: 'test_mode',
};

const existGym = {
  gymName: 'first gym',
  email: 'friends.fit@gmail.com',
  password: 'friends.fit@gmail.com',
  phone: '0592157001',
  city: 'gaza',
  description: 'test desc',
  typeGender: 'male',
  monthlyPrice: 12.21,
  sixMonthPrice: 120.556,
  fulltime: true,
  features: ['test 1', 'test 2'],
  logo: 'test_mode',
};

const invalidInputGym = {
  gymName: 'first gym 2',
  email: 'friends.fit.2@gmail.com',
  password: 'friends.fit.2@gmail.com',
  phone: '0592157001',
  city: 'gaza',
  description: 'test desc',
  typeGender: 'is not valid',
  monthlyPrice: 12.21,
  sixMonthPrice: 120.556,
  fulltime: true,
  features: ['test 1', 'test 2'],
  logo: 'test_mode',
};

describe('Gyms API Testing | Register New Gym', () => {
  test('GET: Test route Register New Gym ~~ path ==> /api/v1/gyms/register ', async () => {
    const response = await request(app).post('/api/v1/gyms/register').send(newGym).expect(201);
    expect(response.headers['set-cookie'][0].startsWith('token')).toEqual(true);
    expect(response.body.message).toBe('تم تسجيل النادي بنجاح');
    expect(response.body.payload.name).toBe(newGym.gymName);
    expect(response.body.payload.role).toBe('gym');
  });

  test('GET: Test route Register Exist Gym ~~ path ==> /api/v1/gyms/register ', async () => {
    const response = await request(app).post('/api/v1/gyms/register').send(existGym).expect(409);
    expect(response.body.status).toBe(409);
    expect(response.body.message).toBe('عذرا هذا الايميل مستخدم من قبل! حاول مرة أخرى');
  });

  test('GET: Test route Register Empty Input Gym ~~ path ==> /api/v1/gyms/register ', async () => {
    const response = await request(app).post('/api/v1/gyms/register').send({}).expect(400);
    expect(response.body.status).toBe(400);
  });

  test('GET: Test route Register new Gym with just gymName ~~ path ==> /api/v1/gyms/register ', async () => {
    const response = await request(app)
      .post('/api/v1/gyms/register')
      .send({ gymName: 'first gym' })
      .expect(400);
    expect(response.body.status).toBe(400);
  });

  test('GET: Test route Register new Gym with just email ~~ path ==> /api/v1/gyms/register ', async () => {
    const response = await request(app)
      .post('/api/v1/gyms/register')
      .send({ email: 'friends.fit@gmail.com' })
      .expect(400);
    expect(response.body.status).toBe(400);
  });

  test('GET: Test route Register new Gym with just password ~~ path ==> /api/v1/gyms/register ', async () => {
    const response = await request(app)
      .post('/api/v1/gyms/register')
      .send({ password: 'friends.fit@gmail.com' })
      .expect(400);
    expect(response.body.status).toBe(400);
  });

  test('GET: Test route Register new Gym with just phone ~~ path ==> /api/v1/gyms/register ', async () => {
    const response = await request(app)
      .post('/api/v1/gyms/register')
      .send({ phone: '0592157001' })
      .expect(400);
    expect(response.body.status).toBe(400);
  });

  test('GET: Test route Register new Gym with just city ~~ path ==> /api/v1/gyms/register ', async () => {
    const response = await request(app)
      .post('/api/v1/gyms/register')
      .send({ city: 'gaza' })
      .expect(400);
    expect(response.body.status).toBe(400);
  });
  test('GET: Test route Register new Gym with just description ~~ path ==> /api/v1/gyms/register ', async () => {
    const response = await request(app)
      .post('/api/v1/gyms/register')
      .send({ description: 'test desc' })
      .expect(400);
    expect(response.body.status).toBe(400);
  });

  test('GET: Test route Register new Gym with just typeGender ~~ path ==> /api/v1/gyms/register ', async () => {
    const response = await request(app)
      .post('/api/v1/gyms/register')
      .send({ typeGender: 'male' })
      .expect(400);
    expect(response.body.status).toBe(400);
  });

  test('GET: Test route Register new Gym with just monthlyPrice ~~ path ==> /api/v1/gyms/register ', async () => {
    const response = await request(app)
      .post('/api/v1/gyms/register')
      .send({ monthlyPrice: 12.21 })
      .expect(400);
    expect(response.body.status).toBe(400);
  });

  test('GET: Test route Register new Gym with just sixMonthPrice ~~ path ==> /api/v1/gyms/register ', async () => {
    const response = await request(app)
      .post('/api/v1/gyms/register')
      .send({ sixMonthPrice: 120.556 })
      .expect(400);
    expect(response.body.status).toBe(400);
  });

  test('GET: Test route Register new Gym with just fulltime ~~ path ==> /api/v1/gyms/register ', async () => {
    const response = await request(app)
      .post('/api/v1/gyms/register')
      .send({ fulltime: true })
      .expect(400);
    expect(response.body.status).toBe(400);
  });

  test('GET: Test route Register new Gym with just features ~~ path ==> /api/v1/gyms/register ', async () => {
    const response = await request(app)
      .post('/api/v1/gyms/register')
      .send({ features: ['test 1', 'test 2'] })
      .expect(400);
    expect(response.body.status).toBe(400);
  });

  test('GET: Test route Register new Gym with just features ~~ path ==> /api/v1/gyms/register ', async () => {
    const response = await request(app)
      .post('/api/v1/gyms/register')
      .send({ logo: 'test_mode' })
      .expect(400);
    expect(response.body.status).toBe(400);
  });

  test('GET: Test route Register new Gym with invalid Input typeGender Gym  ~~ path ==> /api/v1/gyms/register ', async () => {
    await request(app).post('/api/v1/gyms/register').send(invalidInputGym).expect(500);
  });
});
afterAll(() => {
  connection.close();
});

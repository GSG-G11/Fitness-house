import request from 'supertest';
import app from '../server/app';
import buildDB from '../server/database/fakeData/index';
import connection from '../server/database/config/connection';

beforeAll(() => buildDB());
describe('Gyms API Testing | Login to Gym', () => {
    test('POST: Test route Login New Gym ~~ path ==> /api/v1/gyms/login ', async () => {

        const response = await request(app).post('/api/v1/gyms/login').send({
            email: 'friends.fit@gmail.com',
            password: 'friends.fit@gmail.com',
        }).expect(201);
        expect(response.headers['set-cookie'][0].startsWith('token')).toEqual(true);
        expect(response.body.message).toBe('تم تسجيل الدخول بنجاح');
        expect(response.body.payload.id).toBe(1);
        expect(response.body.payload.name).toBe('نادي فريندز للياقة البدنية');
        expect(response.body.payload.role).toBe('gym');
    });

    test('POST: Test route Login New Gym ~~ path ==> /api/v1/gyms/login ', async () => {
        const response = await request(app).post('/api/v1/gyms/login').send({
            email: 'techno.gym@gmail.com',
            password: 'techno.gym@gmail.com',
        }).expect(201);
        expect(response.headers['set-cookie'][0].startsWith('token')).toEqual(true);
        expect(response.body.message).toBe('تم تسجيل الدخول بنجاح');
        expect(response.body.payload.id).toBe(2);
        expect(response.body.payload.name).toBe('Technogym gaza تكنو جيم');
        expect(response.body.payload.role).toBe('gym');
    });

    test('POST: Test route Login New Gym ~~ path ==> /api/v1/gyms/login ', async () => {
        const response = await request(app).post('/api/v1/gyms/login').send({
            email: 'oxegin.gym@gmail.com',
            password: 'oxegin.gym@gmail.com',
        }).expect(201);
        expect(response.headers['set-cookie'][0].startsWith('token')).toEqual(true);
        expect(response.body.message).toBe('تم تسجيل الدخول بنجاح');
        expect(response.body.payload.id).toBe(3);
        expect(response.body.payload.name).toBe('اوكسجن جيم');
        expect(response.body.payload.role).toBe('gym');
    });

    test('POST: Test route Login New Gym ~~ path ==> /api/v1/gyms/login ', async () => {
        const response = await request(app).post('/api/v1/gyms/login').send({
            email: 'malka.gym@gmail.com',
            password: 'malka.gym@gmail.com',
        }).expect(201);
        expect(response.headers['set-cookie'][0].startsWith('token')).toEqual(true);
        expect(response.body.message).toBe('تم تسجيل الدخول بنجاح');
        expect(response.body.payload.id).toBe(4);
        expect(response.body.payload.name).toBe('مركز الملكة الأنيقة للسيدات');
        expect(response.body.payload.role).toBe('gym');
    });

    test('POST: Test route Login New Gym ~~ path ==> /api/v1/gyms/login ', async () => {
        const response = await request(app).post('/api/v1/gyms/login').send({
            email: 'jalaa.gym@gmail.com',
            password: 'jalaa.gym@gmail.com',
        }).expect(201);
        expect(response.headers['set-cookie'][0].startsWith('token')).toEqual(true);
        expect(response.body.message).toBe('تم تسجيل الدخول بنجاح');
        expect(response.body.payload.id).toBe(5);
        expect(response.body.payload.name).toBe('Jalaa Gym -جيم نادي الجلاء');
        expect(response.body.payload.role).toBe('gym');
    });

    test('POST: Test route Login Exist Gym ~~ path ==> /api/v1/gyms/login ', async () => {
        const response = await request(app).post('/api/v1/gyms/login').send({
            email: 'rawan.gym@gmail.com',
            password: 'rawan.gym@gmail.com',
        }).expect(401);
        expect(response.body.status).toBe(401);
        expect(response.body.message).toBe('عذرا لا يوجد حساب نادي بهذا البريد الالكتروني! حاول مرة أخرى');
    });
    
    test('POST: Test route Login Empty Input Gym ~~ path ==> /api/v1/gyms/login ', async () => {
        const response = await request(app).post('/api/v1/gyms/login').send({}).expect(400);
        expect(response.body.status).toBe(400);
        expect(response.body.message).toBe('\"email\" is required');
    });
    
    test('POST: Test route Login new Gym with just email ~~ path ==> /api/v1/gyms/login ', async () => {
        const response = await request(app)
          .post('/api/v1/gyms/login')
          .send({email: 'jalaa.gym@gmail.com'})
          .expect(400);
        expect(response.body.status).toBe(400);
        expect(response.body.message).toBe('\"password\" is required');
    });   

    test('POST: Test route Login new Gym with just password ~~ path ==> /api/v1/gyms/login ', async () => {
        const response = await request(app)
          .post('/api/v1/gyms/login')
          .send({password: 'jalaa.gym@gmail.com'})
          .expect(400);
        expect(response.body.status).toBe(400);
        expect(response.body.message).toBe('\"email\" is required');
    });   

    test('POST: Test route Login new Gym with invalid Input email Gym  ~~ path ==> /api/v1/gyms/login ', async () => {
        const response = await request(app).post('/api/v1/gyms/login').send({
            email: 'jalaa.gym.com',
            password: 'jalaa.gym@gmail.com',
        }).expect(400);
        expect(response.body.status).toBe(400);
        expect(response.body.message).toBe('\"email\" must be a valid email');
    });
  
    test('POST: Test route Login new Gym with invalid Input password Gym  ~~ path ==> /api/v1/gyms/login ', async () => {
        const response = await request(app).post('/api/v1/gyms/login').send({
            email: 'jalaa.gym@gmail.com',
            password: 'jalaa.g',
        }).expect(400);
        expect(response.body.status).toBe(400);
        expect(response.body.message).toBe('\"password\" length must be at least 8 characters long');
    });

    test('POST: Test route Login new Gym with error password  ~~ path ==> /api/v1/gyms/login ', async () => {
        const response = await request(app).post('/api/v1/gyms/login').send({
            email: 'jalaa.gym@gmail.com',
            password: 'jalaa.gym@',
        }).expect(401);
        expect(response.body.status).toBe(401);
        expect(response.body.message).toBe('عذرا البريد الالكتروني او كلمة المرور خطأ! حاول مرة أخرى');
    });
  });

  afterAll(() => {
    connection.close();
  });

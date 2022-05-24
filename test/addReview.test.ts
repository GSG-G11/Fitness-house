    import request from 'supertest';
    import app from '../server/app';
    import buildDB from '../server/database/fakeData/index';
    import connection from '../server/database/config/connection';
    
    const review = {
      gymId: 1,
      username: "علي محمود",
      userPhone: "0597894561",
      description: 'month',
      rate: 3.5,
      };
      
      const nonActive = {
        gymId: 2,
        username: 'ali',
        userPhone: '0592321892',
        description: 'month',
        rate: 3.5,
      };
      const notaUser = {
        gymId: 2,
        username: 'ali',
        userPhone: '0592321882',
        description: 'month',
        rate: 3.5,
      };
    
      beforeAll(() => buildDB());
      describe('Revieq Gyms API Testing', () => {
          
   
        test('POST: Test route Create new Review ~~ path ==> /api/v1/gym/review - Failed ', async () => {
          const response = await request(app)
            .post('/api/v1/gym/review')
            .send(notaUser)
            .expect(401);
          expect(response.body.status).toBe(401);
        });
      
        test('POST: Test route Create new Review ~~ Empty Input ~~ path ==> /api/v1/gym/review - Failed ', async () => {
          const response = await request(app).post('/api/v1/gym/review').send({}).expect(400);
          expect(response.body.status).toBe(400);
        });
      
        test('POST: Test route Create new Review just with gymId ~~ path ==> /api/v1/gym/review - Failed ', async () => {
          const response = await request(app)
            .post('/api/v1/gym/review')
            .send({ gymId: 1 })
            .expect(400);
          expect(response.body.status).toBe(400);
        });
        test('POST: Test route Create new Review just with username ~~ path ==> /api/v1/gym/review - Failed ', async () => {
          const response = await request(app)
            .post('/api/v1/gym/review')
            .send({ username: 'ali' })
            .expect(400);
          expect(response.body.status).toBe(400);
        });
        test('POST: Test route Create new Review just with userPhone ~~ path ==> /api/v1/gym/review - Failed ', async () => {
            const response = await request(app)
                .post('/api/v1/gym/review')
                .send({ userPhone: '0592157001' })
                .expect(400);
            expect(response.body.status).toBe(400);
            }
        );
        test('POST: Test route Create new Review just with description ~~ path ==> /api/v1/gym/review - Failed ', async () => {
            const response = await request(app)
                .post('/api/v1/gym/review')
                .send({ description: 'month' })
                .expect(400);
            expect(response.body.status).toBe(400);
            }
        );
        test('POST: Test route Create new Review just with rate ~~ path ==> /api/v1/gym/review - Failed ', async () => {
            const response = await request(app)
                .post('/api/v1/gym/review')
                .send({ rate: 3.5 })
                .expect(400);
            expect(response.body.status).toBe(400);
            }
        );
        test('POST: Test route Create new Review just with description ~~ path ==> /api/v1/gym/review - Failed ', async () => {
            const response = await request(app)
                .post('/api/v1/gym/review')
                .send({ description: 'good' })
                .expect(400);
            expect(response.body.status).toBe(400);
            }
        );
        test('POST: Test route Create new Review ~~ path ==> /api/v1/gym/review - Do have a subscription ', async () => {
            const response = await request(app)
                .post('/api/v1/gym/review')
                .send(review)
                .expect(201);
            }
        );
        test('POST: Test route Create new Review ~~ path ==> /api/v1/gym/review - Do not have an active subscription -sucsses ', async () => {
            const response = await request(app)
                .post('/api/v1/gym/review')
                .send(nonActive)
                .expect(403);
            expect(response.body.status).toBe(403);
            }
        );
  
      }
        );
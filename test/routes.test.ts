import request from "supertest";
import app from "../server/app";
import buildDB from "../server/database/fakeData/index";
import connection from "../server/database/config/connection";

beforeAll(() => buildDB());

describe("Gyms API", () => {
  test("Gyms - GET - /api/v1/gyms/top - ", async () => {
    const response = await request(app).get("/api/v1/gyms/top").expect(200);
    expect(response.body.topReviewGyms.length).toBe(3);
  });
  test('Gyms - GET - /api/v1/gyms/:id - ', async () => {
    const response = await request(app).get('/api/v1/gyms/1').expect(200);
    expect(response.body.gymData.gymName).toBe("نادي فريندز للياقة البدنية");
    expect(response.body.gymData.city).toBe("غزة");
  });
  test('Gyms - GET - /api/v1/gyms/:id - ', async () => {
    const response = await request(app).get('/api/v1/gyms/2').expect(200);
    expect(response.body.gymData.gymName).toBe("Technogym gaza تكنو جيم");
    expect(response.body.gymData.city).toBe("غزة");
  });
  test('Gyms - GET - /api/v1/gyms/:id - ', async () => {
    const response = await request(app).get('/api/v1/gyms/3').expect(200);
    expect(response.body.gymData.gymName).toBe("اوكسجن جيم");
    expect(response.body.gymData.city).toBe("رفح");
  });
  test('Gyms - GET - /api/v1/gyms/:id - ', async () => {
    const response = await request(app).get('/api/v1/gyms/4').expect(200);
    expect(response.body.gymData.gymName).toBe("مركز الملكة الأنيقة للسيدات");
    expect(response.body.gymData.city).toBe("غزة");
  });
  test('Gyms - GET - /api/v1/gyms/:id - ', async () => {
    const response = await request(app).get('/api/v1/gyms/5').expect(200);
    expect(response.body.gymData.gymName).toBe("Jalaa Gym -جيم نادي الجلاء");
    expect(response.body.gymData.city).toBe("غزة");
  });
  test('Gyms - GET - /api/v1/gyms/:id - ', async () => {
    const response = await request(app).get('/api/v1/gyms/50').expect(404);
    expect(response.body.message).toBe("عذراُ الجيم غير متوفر");
  });
  test('Gyms - GET - /api/v1/gyms/:id - ', async () => {
    const response = await request(app).get('/api/v1/gyms/gggggggg').expect(400);
    expect(response.body.message).toBe("عذراً خطأ في المعرف");
});
});
afterAll(() => {
  connection.close();
});

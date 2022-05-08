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
  test("Gyms - GET - /api/v1/gyms/search - failed ", async () => {
    const response = await request(app)
      .get("/api/v1/gyms/search?q=gazaa")
      .expect(404);
    expect(response.body.message).toBe("No gyms found");
  });
  test("Gyms - GET - /api/v1/gyms/search - success ", async () => {
    const response = await request(app)
      .get("/api/v1/gyms/search?q=Technogym")
      .expect(200);
    expect(response.body.length).toEqual(1);
  });
  test("Gyms - GET - /api/v1/gyms/search - First Item ", async () => {
    const response = await request(app)
      .get("/api/v1/gyms/search?q=Technogym")
      .expect(200);
    expect(response.body[0].id).toEqual(2);
  });
});

afterAll(() => {
  connection.close();
});

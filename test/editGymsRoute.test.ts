import request from "supertest";
import app from "../server/app";
import buildDB from "../server/database/fakeData/index";
import connection from "../server/database/config/connection";

beforeAll(() => buildDB());

const updatedGym = {
  gymId: 1,
  gymName: "aymangym gym",
  phone: "0592157222",
  city: "rafah",
  description: "test desc",
  typeGender: "male",
  monthlyPrice: 16,
  sixMonthPrice: 129,
  fulltime: true,
  features: ["test 1", "test 3"],
  logo: "test_mode",
};

describe("Gyms API Testing | Register New Gym", () => {
  test("PUT: Test route Update Gym ~~ path ==> /api/v1/gyms/ ", async () => {
    const gym = await request(app).put("/api/v1/gyms/").send(updatedGym)
    .set('Cookie', [`token= ${process.env.GYM_TOKEN}`]);
    expect(gym.statusCode).toBe(200);
    
  });
  test("PUT: Test route Update Gym ~~ path ==> /api/v1/gyms/edit/:id not found gym ", async () => {
    const gym = await request(app)
      .put("/api/v1/gyms/")
      .send(updatedGym);
    expect(gym.statusCode).toBe(401);
    expect(gym.body).toHaveProperty("message");
    expect(gym.body.message).toBe("يجب تسجيل الدخول");
  });
  test("PUT: Test route Update Gym ~~ change gym name to alexandria -faild ", async () => {
    const gym = await request(app)
      .put("/api/v1/gyms/").set('Cookie', [`token= ${process.env.GYM_TOKEN}`])
      .send({ gymName: "alexandria" });
    expect(gym.statusCode).toBe(400);
    expect(gym.body).toHaveProperty("message");
    expect(gym.body.message).toBe("عذراً خطأ في المعرف");
  });


});


afterAll(() => {
  connection.close();
});

import request from "supertest";
import app from "../server/app";
import buildDB from "../server/database/fakeData/index";
import connection from "../server/database/config/connection";

beforeAll(() => buildDB());

const existGym = {
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
const updatedGym = {
  gymName: "aymangym gym",
  email: "friends.fit@gmail.com",
  password: "friends.fit@gmail.com",
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
  test("PUT: Test route Update Gym ~~ path ==> /api/v1/gyms/edit/:id ", async () => {
    const gym = await request(app).put("/api/v1/gyms/edit/1").send(updatedGym);
    expect(gym.statusCode).toBe(201);
    expect(gym.body).toHaveProperty("message");
    expect(gym.body.message).toBe("Gym updated");
  });
  test("PUT: Test route Update Gym ~~ path ==> /api/v1/gyms/edit/:id not found gym ", async () => {
    const gym = await request(app)
      .put("/api/v1/gyms/edit/100")
      .send(updatedGym);
    expect(gym.statusCode).toBe(404);
    expect(gym.body).toHaveProperty("message");
    expect(gym.body.message).toBe("Gym not found");
  });
  test("PUT: Test route Update Gym ~~ change gym name to alexandria -faild ", async () => {
    const gym = await request(app)
      .put("/api/v1/gyms/edit/1")
      .send({ gymName: "alexandria" });
    expect(gym.statusCode).toBe(400);
    expect(gym.body).toHaveProperty("message");
    expect(gym.body.message).toBe("عذراً خطأ في المعرف");
  });
  test("PUT: Test update existGym to be updatedgym ", async () => {
    const gym = await request(app)
      .put("/api/v1/gyms/edit/1")
      .send(existGym);
    expect(gym.statusCode).toBe(201);
    expect(gym.body).toHaveProperty("message");
    expect(gym.body.message).toBe("Gym updated");
    
  });


});


afterAll(() => {
  connection.close();
});

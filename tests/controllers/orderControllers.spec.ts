import request from "supertest";

import connect, { MongoHelper } from "../db-helper";
import { createUser, getToken } from "../test-utils";
import app from "../../src/app";

describe("user controller test", () => {
  let mongoHelper: MongoHelper;

  beforeAll(async () => {
    mongoHelper = await connect();
  });

  afterAll(async () => {
    await mongoHelper.closeDatabase();
  });

  afterEach(async () => {
    await mongoHelper.clearDatabase();
  });

  test("should return error when not logging in request", async () => {
    const response = await request(app).get("/api/v1/orders")
    expect(response.status).toBe(401);
  });

  test("should return error when user is not an admin", async () => {
    const response = await createUser("User", "1", "user1@gmail.com", "123", "customer");
    const userData = await getToken(response.body.email, "123");
    const token = userData.body.token;

    const orderResponse = await request(app)
    .get("/api/v1/orders")
    .set("Authorization", "Bearer " + token)
    expect(orderResponse.status).toBe(403);
  });

  test("should return orders when user is an admin", async () => {
    const response = await createUser("User", "1", "user1@gmail.com", "123", "admin");
    const userData = await getToken(response.body.email, "123");
    const token = userData.body.token;

    const orderResponse = await request(app)
    .get("/api/v1/orders")
    .set("Authorization", "Bearer " + token)
    expect(orderResponse.status).toBe(200);
  });

  test("should create orders when user is creating the order", async () => {
    const response = await createUser("User", "1", "user1@gmail.com", "123", "customer");
    const userData = await getToken(response.body.email, "123");
    const token = userData.body.token;

    const orderResponse = await request(app)
    .post(`/api/v1/orders/${response.body._id}`)
    .set("Authorization", "Bearer " + token)
    .send({ productId: '1', quantity: 2 })

    expect(orderResponse.status).toBe(201);
  });

  test("should get orders when user is fetching the order", async () => {
    const response = await createUser("User", "1", "user1@gmail.com", "123", "customer");
    const userData = await getToken(response.body.email, "123");
    const token = userData.body.token;

    const orderResponse = await request(app)
    .get(`/api/v1/orders/${response.body._id}`)
    .set("Authorization", "Bearer " + token)

    expect(orderResponse.status).toBe(200);
  });

  test("should update orders", async () => {
    const response = await createUser("User", "1", "user1@gmail.com", "123", "customer");
    const userData = await getToken(response.body.email, "123");
    const token = userData.body.token;
    expect(response.status).toBe(201);

    const orderResponse = await request(app)
    .post(`/api/v1/orders/${response.body._id}`)
    .set("Authorization", "Bearer " + token)
    .send({ productId: '1', quantity: 2 })
    expect(orderResponse.status).toBe(201);

    const updateOrderResponse = await request(app)
    .put(`/api/v1/orders/${orderResponse.body.newOrder._id}`)
    .set("Authorization", "Bearer " + token)
    .send({ quantity: 3 });
    expect(updateOrderResponse.status).toBe(200);
  });

  test("should delete orders", async () => {
    const response = await createUser("User", "1", "user1@gmail.com", "123", "customer");
    const userData = await getToken(response.body.email, "123");
    const token = userData.body.token;
    expect(response.status).toBe(201);

    const orderResponse = await request(app)
    .post(`/api/v1/orders/${response.body._id}`)
    .set("Authorization", "Bearer " + token)
    .send({ productId: '1', quantity: 2 })
    expect(orderResponse.status).toBe(201);

    const deleteOrderResponse = await request(app)
    .delete(`/api/v1/orders/${orderResponse.body.newOrder._id}`)
    .set("Authorization", "Bearer " + token)
    expect(deleteOrderResponse.status).toBe(204);
  });
});
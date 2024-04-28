import request from "supertest";

import connect, { MongoHelper } from "../db-helper";
import { createUser, getToken } from "../test-utils";
import app from "../../src/app";

describe("product controller test", () => {
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

  test("should create new product when user is an admin and has valid token", async () => {
    const response = await createUser("User", "1", "user1@gmail.com", "123", "admin");
    const userData = await getToken(response.body.email, "123");
    const token = userData.body.token;

    const productResponse = await request(app)
      .post("/api/v1/products")
      .set("Authorization", "Bearer " + token)
      .send({ title: "product1", price: 50, description: "this is a product", image: "imageproduct", categoryId: "661e6c3f3f4e5c0bbff1b033" });

    expect(productResponse.status).toBe(201);
  });

  test("should not create new product when user is not an admin even has valid token", async () => {
    const response = await createUser("User", "2", "user2@gmail.com", "123", "user");
    const userData = await getToken(response.body.email, "123");
    const token = userData.body.token;

    const productResponse = await request(app)
      .post("/api/v1/products")
      .set("Authorization", "Bearer " + token)
      .send({ title: "product1", price: 50, description: "this is a product", image: "imageproduct", categoryId: "661e6c3f3f4e5c0bbff1b033" });

    expect(productResponse.status).toBe(403);
  });

  test("should return all products", async () => {
    const response = await request(app).get("/api/v1/products")
    expect(response.status).toBe(200);
  });

  test("should return a product by product Id", async () => {
    const response = await createUser("User", "1", "user1@gmail.com", "123", "admin");
    const userData = await getToken(response.body.email, "123");
    const token = userData.body.token;

    const responseToGet = await request(app)
    .post("/api/v1/products")
    .set("Authorization", "Bearer " + token)
    .send({ title: "product1", price: 50, description: "this is a product", image: "imageproduct", categoryId: "661e6c3f3f4e5c0bbff1b033" });

    expect(responseToGet.status).toBe(201);

    const responseProduct = await request(app).get(`/api/v1/products/${responseToGet.body._id}`);
    expect(responseProduct.status).toBe(200);
    expect(responseProduct.body).toHaveProperty("_id");
    expect(responseProduct.body).toHaveProperty("title");
    expect(responseProduct.body.title).toEqual("product1");
  });

  test("should update a product by product Id", async () => {
    const response = await createUser("User", "1", "user1@gmail.com", "123", "admin");
    const userData = await getToken(response.body.email, "123");
    const token = userData.body.token;

    const responseToCreate = await request(app)
    .post(`/api/v1/products`)
    .set("Authorization", "Bearer " + token)
    .send({ title: "product1", price: 50, description: "this is a product", image: "imageproduct", categoryId: "661e6c3f3f4e5c0bbff1b033" });

    expect(responseToCreate.status).toBe(201);

    const responseProduct = await request(app)
    .put(`/api/v1/products/${responseToCreate.body._id}`)
    .set("Authorization", "Bearer " + token)
    .send({ name: "updatedProductUpdate" });

    expect(responseProduct.status).toBe(200);
    expect(responseProduct.body).toHaveProperty("_id");
    expect(responseProduct.body).toHaveProperty("title");
    expect(responseProduct.body.title).toEqual("product1");
  });

  test("should delete a product by product Id", async () => {
    const response = await createUser("User", "1", "user1@gmail.com", "123", "admin");
    const userData = await getToken(response.body.email, "123");
    const token = userData.body.token;

    const responseToCreate = await request(app)
    .post(`/api/v1/products`)
    .set("Authorization", "Bearer " + token)
    .send({ title: "product1", price: 50, description: "this is a product", image: "imageproduct", categoryId: "661e6c3f3f4e5c0bbff1b033" });

    expect(responseToCreate.status).toBe(201);

    const responseProduct = await request(app)
    .delete(`/api/v1/products/${responseToCreate.body._id}`)
    .set("Authorization", "Bearer " + token)
    expect(responseProduct.status).toBe(204);
  });

  test("should return products by category", async () => {
    const response = await request(app).get("/api/v1/products/category/661e6c3f3f4e5c0bbff1b033");
    expect(response.status).toBe(200);
  })
});
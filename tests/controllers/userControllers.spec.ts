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
    const response = await request(app).get("/api/v1/users")
    expect(response.status).toBe(401);
  });

  test("should return error when user is not an admin", async () => {
    const response = await createUser("User", "1", "user1@gmail.com", "123", "customer");
    const userData = await getToken(response.body.email, "123");
    const token = userData.body.token;

    const userResponse = await request(app)
    .get("/api/v1/users")
    .set("Authorization", "Bearer " + token)
    expect(userResponse.status).toBe(403);
  });

  test("should return users when user is an admin", async () => {
    const response = await createUser("User", "1", "user1@gmail.com", "123", "admin");
    const userData = await getToken(response.body.email, "123");
    const token = userData.body.token;

    const userResponse = await request(app)
    .get("/api/v1/users")
    .set("Authorization", "Bearer " + token)
    expect(userResponse.status).toBe(200);
  });

  test("should log in user account", async () => {
    const response = await createUser("User", "1", "user1@gmail.com", "123", "customer");
    expect(response.status).toBe(201);

    const userResponse = await request(app)
      .post("/api/v1/users/login")
      .send({ email: "user1@gmail.com", password: "123" });

    expect(userResponse.status).toBe(200);
  });

  test("should create user account", async () => {
    const response = await createUser("User", "1", "user1@gmail.com", "123", "customer");
    expect(response.status).toBe(201);
  });

  test("should update user profile", async () => {
    const response = await createUser("User", "1", "user1@gmail.com", "123", "customer");
    const userData = await getToken(response.body.email, "123");
    const token = userData.body.token;

    const userResponse = await request(app)
    .put(`/api/v1/users/${response.body._id}`)
    .set("Authorization", "Bearer " + token)
    .send({ firstname: "Userupdate" })

    expect(userResponse.status).toBe(200);
    expect(userResponse.body.firstname).toEqual("Userupdate");
  });

  test("should update user password", async () => {
    const response = await createUser("User", "1", "user1@gmail.com", "123", "customer");
    const userData = await getToken(response.body.email, "123");
    const token = userData.body.token;

    const userResponse = await request(app)
    .patch("/api/v1/users/password")
    .set("Authorization", "Bearer " + token)
    .send({ email: "user1@gmail.com", password: "123", newPassword: "1234" })

    expect(userResponse.status).toBe(200);
  });

  test("should return message when user request password", async () => {
    const response = await createUser("User", "1", "user1@gmail.com", "123", "customer");
    const userData = await getToken(response.body.email, "123");
    const token = userData.body.token;

    const userResponse = await request(app)
    .post("/api/v1/users/password")
    .set("Authorization", "Bearer " + token)
    .send({ email: "user1@gmail.com" })

    expect(userResponse.status).toBe(200);
  });

  test("should delete user", async () => {
    const response = await createUser("User", "1", "user1@gmail.com", "123", "admin");
    const userData = await getToken(response.body.email, "123");
    const token = userData.body.token;

    const userResponse = await request(app)
    .delete(`/api/v1/users/${response.body._id}`)
    .set("Authorization", "Bearer " + token)

    expect(userResponse.status).toBe(204);
  });

  test("should authenticate user and return user", async () => {
    const response = await createUser("User", "1", "user1@gmail.com", "123", "customer");
    const userData = await getToken(response.body.email, "123");
    const token = userData.body.token;

    const userResponse = await request(app)
    .get("/api/v1/users/profile")
    .set("Authorization", "Bearer " + token)

    expect(userResponse.status).toBe(200);
    expect(userResponse.body.email).toEqual("user1@gmail.com");
  });

  test("should ban user", async () => {
    const response = await createUser("User", "1", "user1@gmail.com", "123", "admin");
    const userData = await getToken(response.body.email, "123");
    const adminToken = userData.body.token;

    expect(response.status).toBe(201);

    const createUserResponse = await request(app)
      .post("/api/v1/users")
      .send({ firstname: "User", lastname: "2", email: "user2@gmail.com", password: "123", avatar: "avatar" });

    expect(createUserResponse.status).toBe(201);

    const userResponse = await request(app)
      .post(`/api/v1/users/${createUserResponse.body._id}/ban`)
      .set("Authorization", "Bearer " + adminToken)

      expect(userResponse.status).toBe(200);
  });

  test("should unban user", async () => {
    const response = await createUser("User", "1", "user1@gmail.com", "123", "admin");
    const userData = await getToken(response.body.email, "123");
    const adminToken = userData.body.token;

    expect(response.status).toBe(201);

    const createUserResponse = await request(app)
      .post("/api/v1/users")
      .send({ firstname: "User", lastname: "2", email: "user2@gmail.com", password: "123", avatar: "avatar" });

    expect(createUserResponse.status).toBe(201);

    const userResponse = await request(app)
      .post(`/api/v1/users/${createUserResponse.body._id}/unban`)
      .set("Authorization", "Bearer " + adminToken)

      expect(userResponse.status).toBe(200);
  });
});
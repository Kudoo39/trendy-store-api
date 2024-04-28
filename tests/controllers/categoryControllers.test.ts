import request from "supertest";

import connect, { MongoHelper } from "../db-helper";
import app from "../../src/app";
import { createUser, getToken } from "../test-utils";

describe("category controller test", () => {
  // connect database
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

  // CREATE A CATEGORY
  test("should create a category", async () => {
    const response = await createUser("User", "1", "user1@gmail.com", "123", "admin");
    const userData = await getToken(response.body.email, "123");
    const token = userData.body.token;

    const categoryResponse = await request(app)
      .post("/api/v1/categories")
      .set("Authorization", "Bearer " + token)
      .send({ name: "category1", image: "cateimage1" });
    expect(categoryResponse.status).toBe(201);
    expect(categoryResponse.body).toHaveProperty("_id");
    expect(categoryResponse.body).toHaveProperty("name");
    expect(categoryResponse.body.name).toEqual("category1");
  });

  // GET ALL CATEGORIES
  test("should return list of categories", async () => {
    const response = await request(app).get("/api/v1/categories");
    expect(response.status).toBe(200);
    expect(response.body.length).toEqual(0);
  });

  // DELETE A CATEGORY
  test("should delete a category", async () => {
    const response = await createUser("User", "1", "user1@gmail.com", "123", "admin");
    const userData = await getToken(response.body.email, "123");
    const token = userData.body.token;

    // create a category first then delete it
    const responseToCreate = await request(app)
    .post("/api/v1/categories")
    .set("Authorization", "Bearer " + token)
    .send({ name: "categoryCreate", image: "cateimagecreate" });

    // check if this category is created successfully
    expect(responseToCreate.status).toBe(201);

    // delete that category
    const responseCategory = await request(app)
    .delete(`/api/v1/categories/${responseToCreate.body._id}`)
    .set("Authorization", "Bearer " + token)
    expect(responseCategory.status).toBe(204);
  });

  // UPDATE A CATEGORY
  test("should update a category", async () => {
    const response = await createUser("User", "1", "user1@gmail.com", "123", "admin");
    const userData = await getToken(response.body.email, "123");
    const token = userData.body.token;

      // create a category first then update it
      const responseToCreate = await request(app)
      .post("/api/v1/categories")
      .set("Authorization", "Bearer " + token)
      .send({ name: "categoryUpdate", image: "cateimageupdate" })

      // check if this category is created successfully
      expect(responseToCreate.status).toBe(201);

      // update that category
      const responseCategory = await request(app)
      .put(`/api/v1/categories/${responseToCreate.body._id}`)
      .set("Authorization", "Bearer " + token)
      .send({ name: "updatedCategoryUpdate" });

      // Check if update was successful
      expect(responseCategory.status).toBe(200);
      expect(responseCategory.body).toHaveProperty("_id");
      expect(responseCategory.body).toHaveProperty("name");
      expect(responseCategory.body.name).toEqual("updatedCategoryUpdate");
  });

  // GET CATEGORY BY ID
  test("should get a category by Id", async () => {
    const response = await createUser("User", "1", "user1@gmail.com", "123", "admin");
    const userData = await getToken(response.body.email, "123");
    const token = userData.body.token;
    // create a category first
    const responseToGet = await request(app)
    .post("/api/v1/categories")
    .set("Authorization", "Bearer " + token)
    .send({ name: "categoryGet", image: "cateimageget" });

    // check if this category is created successfully
    expect(responseToGet.status).toBe(201);

    const responseCategory = await request(app).get(`/api/v1/categories/${responseToGet.body._id}`);
    expect(responseCategory.status).toBe(200);
    expect(responseCategory.body).toHaveProperty("_id");
    expect(responseCategory.body).toHaveProperty("name");
    expect(responseCategory.body.name).toEqual("categoryGet");
  });
});
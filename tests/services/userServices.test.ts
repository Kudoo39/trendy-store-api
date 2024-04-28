import connect, { MongoHelper } from "../db-helper";
import userServices from "../../src/services/users";
import User from "../../src/model/User";

async function createUser() {
  const user = new User({
    "firstname": "User",
    "lastname": "3",
    "email": "user3@mail.com",
    "password": "123",
    "avatar": "image"
});
  return await userServices.createUser(user);
}

describe("user test", () => {
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

   // GET ALL USERS
   test("should return list of users", async () => {
    await createUser();

    const userList = await userServices.getAllUsers();
    expect(userList.length).toEqual(1);
    expect(userList[0]).toHaveProperty("firstname");
    expect(userList[0]).toHaveProperty("lastname");
    expect(userList[0]).toHaveProperty("email");
    expect(userList[0]).toHaveProperty("_id");
  });
})
import connect, { MongoHelper } from "../db-helper";
import orderServices from "../../src/services/orders";
import Order from "../../src/model/Order";

async function createOrder() {
  const order = new Order({
    "products": [
      {
        "productId": "661e6e2e3f4e5c0bbff1b03f",
        "quantity": 5
      },
      {
        "productId": "661e6e523f4e5c0bbff1b079",
        "quantity": 2
      }
    ]
  });
  return await orderServices.createOrder(order);
}

describe("order test", () => {
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

   // GET ALL ORDERS
   test("should return list of orders", async () => {
    await createOrder();

    const orderList = await orderServices.getAllOrders();
    expect(orderList.length).toEqual(1);
    expect(orderList[0]).toHaveProperty("products");
    expect(orderList[0]).toHaveProperty("_id");
  });
})
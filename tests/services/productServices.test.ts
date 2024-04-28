import connect, { MongoHelper } from "../db-helper";
import productServices from "../../src/services/products";
import Product from "../../src/model/Product";

async function createProduct() {
  const product = new Product({ title: "product1", price: 10 });
  return await productServices.createProduct(product);
}

describe("product test", () => {
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

  // CREATE A PRODUCT
  test("should create a product", async () => {
    const newProduct = await createProduct();
    expect(newProduct).toHaveProperty("_id");
    expect(newProduct).toHaveProperty("title");
    expect(newProduct.title).toEqual("product1");
  });

  // GET ALL PRODUCTS
  test("should return list of products", async () => {
    await createProduct();

    // check product list
    const productList = await productServices.getAllProducts(10, 0, "", 0, 1000);
    expect(productList.totalProduct).toEqual(1);
    expect(productList.products.length).toEqual(1);
    expect(productList.products[0]).toHaveProperty("title");
    expect(productList.products[0]).toHaveProperty("_id");
  });

  // DELETE A PRODUCT
  test("should delete a product", async () => {
    const newProduct = await createProduct();

    expect(newProduct).toHaveProperty("_id");
   
    let productList = await productServices.getAllProducts(10, 0, "", 0, 1000);
    expect(productList.products.length).toEqual(1);

    await productServices.deleteProductById(newProduct._id);
    productList = await productServices.getAllProducts(10, 0, "", 0, 1000);
    expect(productList.products.length).toEqual(0);
  });

  // UPDATE A PRODUCT
  test("should update a product", async () => {
    // First, create a product to update
    const newProduct = await createProduct();

    // check if this product is created successfully
    expect(newProduct).toHaveProperty("_id");
   
    // check product list
    let productList = await productServices.getAllProducts(10, 0, "", 0, 1000);
    expect(productList.products.length).toEqual(1);

    // update this product
    await productServices.updateProduct(newProduct._id, { title: "updatedProducttitle" });
    productList = await productServices.getAllProducts(10, 0, "", 0, 1000);
    expect(productList.products[0]).toHaveProperty("title");
    expect(productList.products[0].title).toEqual("updatedProducttitle");
  });
});

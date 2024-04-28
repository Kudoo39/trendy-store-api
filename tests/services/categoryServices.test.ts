import connect, { MongoHelper } from "../db-helper";
import categoryServices from "../../src/services/categories";
import Category from "../../src/model/Category";

// createCategory
async function createCategory() {
  const category = new Category({ name: "category1" });
  return await categoryServices.createCategory(category);
}

//tear down
describe("category test", () => {
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
    const newCategory = await createCategory();
    expect(newCategory).toHaveProperty("_id");
    expect(newCategory).toHaveProperty("name");
    expect(newCategory.name).toEqual("category1");
  });

  // GET ALL CATEGORIES
  test("should return list of categories", async () => {
    await createCategory();

    // check category list
    const categoryList = await categoryServices.getAllCategories();
    expect(categoryList.length).toEqual(1);
    expect(categoryList[0]).toHaveProperty("name");
    expect(categoryList[0]).toHaveProperty("_id");
  });

  // DELETE A CATEGORY
  test("should delete a category", async () => {
    // First, create a category to delete
    const newCategory = await createCategory();

    // check if this category is created successfully
    expect(newCategory).toHaveProperty("_id");
   
    // check category list
    let categoryList = await categoryServices.getAllCategories();
    expect(categoryList.length).toEqual(1);

    // delete this category
    await categoryServices.deleteCategoryById(newCategory._id);
    categoryList = await categoryServices.getAllCategories();
    expect(categoryList.length).toEqual(0);
  });

  // UPDATE A CATEGORY
  test("should delete a category", async () => {
    // First, create a category to update
    const newCategory = await createCategory();

    // check if this category is created successfully
    expect(newCategory).toHaveProperty("_id");
   
    // check category list
    let categoryList = await categoryServices.getAllCategories();
    expect(categoryList.length).toEqual(1);

    // update this category
    await categoryServices.updateCategory(newCategory._id, { name: "updatedCategoryName" });
    categoryList = await categoryServices.getAllCategories();
    expect(categoryList[0]).toHaveProperty("name");
    expect(categoryList[0].name).toEqual("updatedCategoryName");
  });
});
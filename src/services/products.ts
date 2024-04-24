import { NotFoundError } from '../errors/ApiError'
import Product, { ProductDocument } from '../model/Product'

const getAllProducts = async (
  limit: number,
  offset: number,
  searchQuery: string,
  minPrice: number,
  maxPrice: number
): Promise<{ totalProduct: number, products: ProductDocument[] }> => {
  try {
    const totalProduct = await Product.countDocuments({
      title: { $regex: new RegExp(searchQuery, 'i') },
      price: { $gte: minPrice, $lte: maxPrice }
    })
    
    const products = await Product.find({
      title: { $regex: new RegExp(searchQuery, 'i') },
      price: { $gte: minPrice, $lte: maxPrice }
    })
      .populate({
        path: 'categoryId',
        select: { name: 1 }
      })
      .limit(limit)
      .skip(offset)
      .exec()

    return { totalProduct, products }
  } catch (error) {
    throw new Error('Failed to fetch products')
  }
}

const getCategoryProducts = async (
  categoryId: string,
  limit: number,
  offset: number,
  searchQuery: string,
  minPrice: number,
  maxPrice: number
): Promise<{ totalProduct: number, products: ProductDocument[] }> => {
  try {
    const totalProduct = await Product.countDocuments({
      categoryId,
      title: { $regex: new RegExp(searchQuery, 'i') },
      price: { $gte: minPrice, $lte: maxPrice }
    })
    
    const products = await Product.find({
      categoryId,
      title: { $regex: new RegExp(searchQuery, 'i') },
      price: { $gte: minPrice, $lte: maxPrice }
    })
      .populate({
        path: 'categoryId',
        select: { name: 1 }
      })
      .limit(limit)
      .skip(offset)
      .exec()

    return { totalProduct, products }
  } catch (error) {
    throw new Error('Failed to fetch products')
  }
}

const createProduct = async (Product: ProductDocument): Promise<ProductDocument> => {
  try {
    return await Product.save()
  } catch (error) {
    throw new Error('Failed to create product')
  }
}

const getProductById = async (id: string): Promise<ProductDocument> => {
  try {
    const foundProduct = await Product.findById(id)
    .populate({
      path: 'categoryId',
      select: { name: 1 }
    })
  if (foundProduct) {
    return foundProduct
  }
  throw new NotFoundError()
  } catch (error) {
    if (error instanceof NotFoundError) {
      throw error
    }
    throw new Error('Failed to fetch product by ID'); 
  }
}

const deleteProductById = async (id: string) => {
  try {
    const foundProduct = await Product.findByIdAndDelete(id)
  if (foundProduct) {
    return foundProduct
  }
  throw new NotFoundError()
  } catch (error) {
    if (error instanceof NotFoundError) {
      throw error
    }
    throw new Error('Failed to fetch product by ID'); 
  }
}

const updateProduct = async (id: string, newInformation: Partial<ProductDocument>) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, newInformation, {
      new: true
    })
    if (updatedProduct) {
      return updatedProduct
    }
    throw new NotFoundError()
  } catch (error) {
    if (error instanceof NotFoundError) {
      throw error
    }
    throw new Error('Failed to fetch product by ID'); 
  }
}

export default {
  getAllProducts,
  getCategoryProducts,
  createProduct,
  getProductById,
  deleteProductById,
  updateProduct
}

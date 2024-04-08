import express from 'express'

import {
  getAllProducts,
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
  getCategoryProducts
} from '../controllers/products'
import verifyJWT from '../middlewares/verifyJWT'
import adminCheck from '../middlewares/adminCheck'

const router = express.Router()

// GET PRODUCTS
router.get('/', getAllProducts)

// GET PRODUCTS BY CATEGORY
router.get('/category/:categoryId', getCategoryProducts)

// CREATE A PRODUCT
router.post('/', verifyJWT, adminCheck, createProduct)

// GET A PRODUCT
router.get('/:productId', getProduct)

// UPDATE A PRODUCT
router.put('/:productId', verifyJWT, adminCheck, updateProduct)

// DELETE A PRODUCT
router.delete('/:productId', verifyJWT, adminCheck, deleteProduct)

export default router

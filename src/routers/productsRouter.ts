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
import { validateCreateProduct } from '../validations/productValidation'

const router = express.Router()

router.get('/', getAllProducts)
router.get('/category/:categoryId', getCategoryProducts)
router.get('/:productId', getProduct)
router.post('/', validateCreateProduct, verifyJWT, adminCheck, createProduct)
router.put('/:productId', verifyJWT, adminCheck, updateProduct)
router.delete('/:productId', verifyJWT, adminCheck, deleteProduct)

export default router

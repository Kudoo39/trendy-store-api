import express from 'express'

import {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategoryById
} from '../controllers/categories'
// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
import verifyJWT from '../middlewares/verifyJWT'
// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
import adminCheck from '../middlewares/adminCheck'
import { validateCreateCategory } from '../validations/categoryValidation'

const router = express.Router()

// GET ALL CATEGORIES
router.get('/', getAllCategories)

// GET CATEGORY BY ID
router.get('/:categoryId', getCategoryById)

// CREATE A CATEGORY
// router.post("/", verifyJWT, adminCheck, createCategory);
router.post('/', validateCreateCategory, createCategory)

// UPDATE A CATEGORY
// router.put("/:categoryId", verifyJWT, adminCheck, updateCategory);
router.put('/:categoryId', updateCategory)

// DELETE A CATEGORY
// router.delete("/:categoryId", verifyJWT, adminCheck, deleteCategoryById);
router.delete('/:categoryId', deleteCategoryById)

export default router

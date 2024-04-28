import express from 'express'

import {
  authenticateUser,
  banUser,
  createUser,
  deleteUser,
  getAllUsers,
  loginUser,
  requestPassword,
  unbanUser,
  updatedPassword,
  updatedUser
} from '../controllers/users'
import verifyJWT from '../middlewares/verifyJWT'
import adminCheck from '../middlewares/adminCheck'
import { validateCreateUser, validateLoginUser } from '../validations/userValidation'

const router = express.Router()

router.get('/', getAllUsers)
router.post('/login', validateLoginUser, loginUser)
router.post('/', validateCreateUser, createUser)
router.put('/:userId', verifyJWT, updatedUser)
router.patch('/password', verifyJWT, updatedPassword)
router.post('/password', requestPassword)
router.delete('/:userId', verifyJWT, adminCheck, deleteUser)
router.get('/profile', verifyJWT, authenticateUser)

router.post('/:userId/ban', verifyJWT, adminCheck, banUser)
router.post('/:userId/unban', verifyJWT, adminCheck, unbanUser)

export default router

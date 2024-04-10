import express from 'express'

import {
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
import adminCheck from '../middlewares/adminCheck'
import verifyJWT from '../middlewares/verifyJWT'
import { validateCreateUser, validateLoginUser } from '../validations/userValidation'

const router = express.Router()

router.get('/', getAllUsers)

// LOGIN
router.post('/login', validateLoginUser, loginUser)

// REGISTER
router.post('/', validateCreateUser, createUser)

// UPDATE USER
router.put('/:userId', verifyJWT, updatedUser)

// CHANGE PASSWORD
router.put('/change-password', updatedPassword)

// FORGET PASSWORD REQUEST
router.post('/forgot-password', requestPassword)

// DELETE USER
router.delete('/:userId', deleteUser)

// BAN & UNBAN USERS
router.post('/:userId/ban', verifyJWT, adminCheck, banUser)
router.post('/:userId/unban', verifyJWT, adminCheck, unbanUser)

export default router

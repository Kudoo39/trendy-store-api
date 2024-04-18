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
// router.put('/:userId', verifyJWT, updatedUser)
router.put('/:userId', updatedUser)

// CHANGE PASSWORD
router.patch('/password', updatedPassword)

// FORGET PASSWORD REQUEST
router.post('/password', requestPassword)

// DELETE USER
router.delete('/:userId', deleteUser)

// AUTHENTICATE USER
router.get('/profile', verifyJWT, authenticateUser)

// BAN & UNBAN USERS
router.post('/:userId/ban', verifyJWT, adminCheck, banUser)
router.post('/:userId/unban', verifyJWT, adminCheck, unbanUser)

export default router

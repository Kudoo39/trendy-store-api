import express from 'express'

import { getAllOrders, createOrder, getOrder, updateOrder, deleteOrder } from '../controllers/orders'
import verifyJWT from '../middlewares/verifyJWT'
import adminCheck from '../middlewares/adminCheck'

const router = express.Router()

// GET ORDERS
router.get('/', verifyJWT, adminCheck, getAllOrders)

// A USER CREATES AN ORDER
router.post('/:userId', verifyJWT, createOrder)

// GET AN ORDER BY USER ID
router.get('/:userId', verifyJWT, getOrder)

// UPDATE AN ORDER
router.put('/:orderId', verifyJWT, updateOrder)

// DELETE AN ORDER
router.delete('/:orderId', verifyJWT, deleteOrder)

export default router

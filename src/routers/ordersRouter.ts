import express from 'express'

import { getAllOrders, createOrder, getOrder, updateOrder, deleteOrder } from '../controllers/orders'
import verifyJWT from '../middlewares/verifyJWT'
import adminCheck from '../middlewares/adminCheck'

const router = express.Router()

router.get('/', verifyJWT, adminCheck, getAllOrders)
router.post('/:userId', verifyJWT, createOrder)
router.get('/:userId', verifyJWT, getOrder)
router.put('/:orderId', verifyJWT, updateOrder)
router.delete('/:orderId', verifyJWT, deleteOrder)

export default router

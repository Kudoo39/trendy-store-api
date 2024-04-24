import { NotFoundError } from '../errors/ApiError'
import Order, { OrderDocument } from '../model/Order'
import User, { UserDocument } from '../model/User'

const getAllOrders = async (): Promise<OrderDocument[]> => {
  try {
    return await Order.find()
  } catch (error) {
    throw new Error('Failed to fetch orders')
  }
}

const createOrder = async (order: OrderDocument): Promise<OrderDocument> => {
  try {
    return await order.save()
  } catch (error) {
    throw new Error('Failed to create orders')
  }
}

// get orders by userId
const getOrderByUserId = async (userId: string): Promise<UserDocument> => {
  try {
    const foundOrder = await User.findById(userId)
    if (foundOrder) {
      return foundOrder
    }
    throw new NotFoundError()
  } catch (error) {
    if (error instanceof NotFoundError) {
      throw error
    }
    throw new Error('Failed to find this order');
  }
}

const deleteOrderById = async (id: string) => {
  try {
    const foundOrder = await Order.findByIdAndDelete(id)
    if (foundOrder) {
      return foundOrder
    }
    throw new NotFoundError()
  } catch (error) {
    if (error instanceof NotFoundError) {
      throw error
    }
    throw new Error('Failed to find this order');
  }
}

const updateOrder = async (id: string, newInformation: Partial<OrderDocument>) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(id, newInformation, {
      new: true
    })
    if (updatedOrder) {
      return updatedOrder
    }
    throw new NotFoundError()
  } catch (error) {
    if (error instanceof NotFoundError) {
      throw error
    }
    throw new Error('Failed to find this order')
  }
}

export default {
  getAllOrders,
  createOrder,
  getOrderByUserId,
  deleteOrderById,
  updateOrder
}

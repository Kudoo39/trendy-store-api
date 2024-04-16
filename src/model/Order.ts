import mongoose, { Document } from 'mongoose'

import { Order } from '../misc/type'
import { OrderProductSchema } from './OrderProduct'

export type OrderDocument = Document & Order

export const OrderSchema = new mongoose.Schema({
  products: [
    {
      type: OrderProductSchema
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now()
  }
})

export default mongoose.model<OrderDocument>('Order', OrderSchema)

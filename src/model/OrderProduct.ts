import mongoose, { Document, Schema } from 'mongoose'

import { OrderProduct } from '../misc/type'

export type OrderProductDocument = Document & OrderProduct

export const OrderProductSchema = new mongoose.Schema({
  productId: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  quantity: {
    type: Number,
    default: 1
  }
})

export default mongoose.model<OrderProductDocument>('OrderProduct', OrderProductSchema)

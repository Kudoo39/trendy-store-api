import mongoose, { Document, Schema } from 'mongoose'

import { Product } from '../misc/type'

export type ProductDocument = Document & Product

const ProductSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true
  },
  price: {
    type: Number,
    default: 10
  },
  description: {
    type: String,
    default: 'This is a product'
  },
  image: {
    type: String,
    default: 'https://picsum.photos/800'
  },
  categoryId: {
    type: Schema.Types.ObjectId,
    ref: 'Category'
  }
})

export default mongoose.model<ProductDocument>('Product', ProductSchema)

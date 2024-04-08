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
  size: {
    type: String,
    default: 'M',
    enum: ['S', 'M', 'L']
  },
  image: {
    type: String,
    default: 'https://picsum.photos/seed/picsum/600/400'
  },
  categoryId: {
    type: Schema.Types.ObjectId,
    ref: 'Category'
  }
})

export default mongoose.model<ProductDocument>('Product', ProductSchema)

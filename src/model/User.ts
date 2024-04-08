import mongoose, { Document } from 'mongoose'

import { User } from '../misc/type'
import { OrderSchema } from './Order'

export type UserDocument = Document & User

const UserSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true,
    enum: ['customer', 'admin']
  },
  avatar: {
    type: String,
    default: 'https://picsum.photos/seed/picsum/600/400'
  },
  orders: [
    {
      type: OrderSchema
    }
  ],
  banStatus: {
    type: Boolean,
    default: false
  }
})

export default mongoose.model<UserDocument>('Users', UserSchema)

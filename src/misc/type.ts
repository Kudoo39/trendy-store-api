import { Request } from 'express'

export type Product = {
  title: string
  price: number
  description: string
  image: string
  categoryId: string
}

export type CategoryProductsQuery = {
  limit?: number
  offset?: number
  searchQuery?: string
  minPrice?: number
  maxPrice?: number
}

export type User = {
  firstname: string
  lastname: string
  password: string
  email: string
  role: string
  avatar: string
  orders?: Order[]
  banStatus: boolean
}

export type DecodedUser = {
  _id: string
  email: string
  role: string
  iat: number
  exp: number
}

export type WithAuthRequest = Request & {
  decodedUser?: DecodedUser
}

export type Order = {
  products: Product[]
  totalPrice: number
  createAt: string
}

export type Category = {
  name: string
  image: string
}

export type OrderProduct = {
  productId: string
  quantity: number
}

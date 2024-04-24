import { NextFunction, Request, Response } from 'express'
import mongoose from 'mongoose'

import ProductsService from '../services/products'
import Product, { ProductDocument } from '../model/Product'
import { InternalServerError, NotFoundError } from '../errors/ApiError'
import { CategoryProductsQuery } from '../misc/type'

export async function getAllProducts(request: Request, response: Response, next: NextFunction) {
  try {
    const {
      limit = 2e64,
      offset = 0,
      searchQuery = '',
      minPrice = 0,
      maxPrice = 2e64
    }: CategoryProductsQuery = request.query

    const { totalProduct, products } = await ProductsService.getAllProducts(
      Number(limit),
      Number(offset),
      searchQuery as string,
      Number(minPrice),
      Number(maxPrice)
    )
    response.status(200).json({ totalProduct: totalProduct, products: products })
  } catch (error) {
    next(new InternalServerError())
  }
}

export async function getCategoryProducts(request: Request, response: Response, next: NextFunction) {
  try {
    const {
      limit = 2e64,
      offset = 0,
      searchQuery = '',
      minPrice = 0,
      maxPrice = 2e64
    }: CategoryProductsQuery = request.query

    const { totalProduct, products } = await ProductsService.getCategoryProducts(
      request.params.categoryId as string,
      Number(limit),
      Number(offset),
      searchQuery as string,
      Number(minPrice),
      Number(maxPrice)
    )
    response.status(200).json({ totalProduct: totalProduct, products: products })
  } catch (error) {
    next(new InternalServerError())
  }
}

export async function createProduct(request: Request, response: Response, next: NextFunction) {
  try {
    const newData = new Product(request.body)
    const newProduct = await ProductsService.createProduct(newData)
    response.status(201).json(newProduct)
  } catch (error) {
    next(new InternalServerError())
  }
}

export async function getProduct(request: Request, response: Response, next: NextFunction) {
  try {
    const foundProduct = await ProductsService.getProductById(request.params.productId)
    response.status(200).json(foundProduct)
  } catch (error) {
    if (error instanceof NotFoundError) {
      next(error)
    }

    if (error instanceof mongoose.Error.CastError) {
      response.status(404).json({
        message: 'wrong id format'
      })
      return
    }

    next(new InternalServerError())
  }
}

export async function updateProduct(request: Request, response: Response, next: NextFunction) {
  try {
    const newData = request.body as Partial<ProductDocument>
    const foundProduct = await ProductsService.updateProduct(request.params.productId, newData)
    response.status(200).json(foundProduct)
  } catch (error) {
    if (error instanceof NotFoundError) {
      next(error)
    }

    if (error instanceof mongoose.Error.CastError) {
      response.status(404).json({
        message: 'wrong id format'
      })
      return
    }

    next(new InternalServerError())
  }
}

export async function deleteProduct(request: Request, response: Response, next: NextFunction) {
  try {
    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    const foundProduct = await ProductsService.deleteProductById(request.params.productId)
    response.sendStatus(204)
  } catch (error) {
    if (error instanceof NotFoundError) {
      next(error)
    }

    if (error instanceof mongoose.Error.CastError) {
      response.status(404).json({
        message: 'wrong id format'
      })
      return
    }

    next(new InternalServerError())
  }
}

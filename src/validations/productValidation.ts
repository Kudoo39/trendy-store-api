import Joi, { Schema } from 'joi'
import { Request, Response, NextFunction } from 'express'

import { BadRequest } from '../errors/ApiError'

type ProductSchema = Schema & {
  title: Schema
  price: Schema
  description: Schema
  image?: Schema
  categoryId: Schema
}

const createProductValidation: ProductSchema = Joi.object({
  title: Joi.string().required().min(1).max(50).trim().strict(),
  price: Joi.number().min(0).required(),
  description: Joi.string().required().trim().strict(),
  image: Joi.string().required(),
  categoryId: Joi.string().required(),
}) as ProductSchema

export const validateCreateProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await createProductValidation.validateAsync(req.body, { abortEarly: false })
    next()
  } catch (error) {
    next(new BadRequest())
  }
}

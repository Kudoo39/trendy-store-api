import Joi, { Schema } from 'joi'
import { Request, Response, NextFunction } from 'express'

import { BadRequest } from '../errors/ApiError'

type CategorySchema = Schema & {
  name: Schema
  image: Schema
}

const createCategoryValidation: CategorySchema = Joi.object({
  name: Joi.string().required().min(1).max(50).trim().strict(),
  image: Joi.string().required(),
}) as CategorySchema

export const validateCreateCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await createCategoryValidation.validateAsync(req.body, { abortEarly: false })
    next()
  } catch (error) {
    next(new BadRequest())
  }
}

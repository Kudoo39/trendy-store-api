import Joi, { Schema } from 'joi'
import { Request, Response, NextFunction } from 'express'

import { BadRequest } from '../errors/ApiError'

type UserSchema = Schema & {
  firstname?: Schema
  lastname?: Schema
  email: Schema
  password: Schema
  role?: Schema
}

export const createUserValidation: UserSchema = Joi.object({
  firstname: Joi.string().required().min(3).max(20).trim().strict(),
  lastname: Joi.string().required().min(3).max(50).trim().strict(),
  email: Joi.string().email().required(),
  password: Joi.string().required().min(3).max(50).trim().strict(),
  role: Joi.string().valid('customer', 'admin').required()
}) as UserSchema

export const validateCreateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await createUserValidation.validateAsync(req.body, { abortEarly: false })
    next()
  } catch (error) {
    next(new BadRequest())
  }
}

export const loginUserValidation: UserSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required().min(3).max(50).trim().strict()
}) as UserSchema

export const validateLoginUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await loginUserValidation.validateAsync(req.body, { abortEarly: false })
    next()
  } catch (error) {
    next(new BadRequest())
  }
}

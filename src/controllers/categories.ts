import { NextFunction, Request, Response } from 'express'
import mongoose from 'mongoose'

import categoriesService from '../services/categories'
import Category, { CategoryDocument } from '../model/Category'
import { BadRequest, InternalServerError, NotFoundError } from '../errors/ApiError'
import apiErrorhandler from '../middlewares/apiErrorhandler'

export async function getAllCategories(_: Request, response: Response, next: NextFunction) {
  try {
    const categories = await categoriesService.getAllCategories()
    response.status(200).json(categories)
  } catch (error) {
    next(new InternalServerError('Internal error'))
  }
}

export async function createCategory(request: Request, response: Response, next: NextFunction) {
  try {
    const newData = new Category(request.body)
    const newCategory = await categoriesService.createCategory(newData)
    response.status(201).json(newCategory)
  } catch (error) {
    next(new InternalServerError('Internal error'))
  }
}

export async function getCategoryById(request: Request, response: Response, next: NextFunction) {
  try {
    const foundCategory = await categoriesService.getCategoryById(request.params.categoryId)
    response.status(200).json(foundCategory)
  } catch (error) {
    if (error instanceof mongoose.Error.CastError) {
      response.status(404).json({
        message: 'Invalid category id format'
      })
      return
    }

    if (error instanceof NotFoundError) {
      apiErrorhandler(error, request, response, next)
    }

    next(error)
  }
}

export async function updateCategory(request: Request, response: Response, next: NextFunction) {
  try {
    const categoryId = request.params.categoryId
    const newInformation = request.body as Partial<CategoryDocument>
    const updatedCategory = await categoriesService.updateCategory(categoryId, newInformation)
    response.status(200).json(updatedCategory)
  } catch (error) {
    if (error instanceof BadRequest) {
      apiErrorhandler(error, request, response, next)
    }

    if (error instanceof NotFoundError) {
      apiErrorhandler(error, request, response, next)
    }

    if (error instanceof mongoose.Error.CastError) {
      response.status(404).json({
        message: 'Invalid category id format'
      })
      return
    }

    next(new InternalServerError())
  }
}

export async function deleteCategoryById(request: Request, response: Response, next: NextFunction) {
  try {
    const deletedCategory = categoriesService.deleteCategoryById(request.params.categoryId)
    response.status(204).json(deletedCategory)
  } catch (error) {
    // handle error
    if (error instanceof NotFoundError) {
      apiErrorhandler(error, request, response, next)
    }
    next(new InternalServerError())
  }
}

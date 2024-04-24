import { NextFunction, Request, Response } from 'express'

import { ApiError } from '../errors/ApiError'

// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
function apiErrorHandler(error: ApiError, request: Request, response: Response, next: NextFunction) {
  if (!error.statusCode && !error.message) {
    response.status(500).json({ message: 'Internal error' })
  }
  response.status(error.statusCode).json({ message: error.message })
}

export default apiErrorHandler

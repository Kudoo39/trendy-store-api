import { NextFunction, Response } from 'express'

import { WithAuthRequest } from '../misc/type'
import { ForbiddenError } from '../errors/ApiError'

const adminCheck = (request: WithAuthRequest, response: Response, next: NextFunction) => {
  const user = request.decodedUser

  if (!user || user.role !== 'admin') {
    next(new ForbiddenError('Access denied! You are not the admin!'))
    return
  }

  next()
}

export default adminCheck

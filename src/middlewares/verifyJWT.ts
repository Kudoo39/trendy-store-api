import { NextFunction, Response } from 'express'
import jwt from 'jsonwebtoken'

import { ForbiddenError, UnauthorizedError } from '../errors/ApiError'
import { DecodedUser, WithAuthRequest } from '../misc/type'

const verifyJWT = async (request: WithAuthRequest, response: Response, next: NextFunction) => {
  const authHeader = request.headers.authorization
  const JWT_SECRET = process.env.JWT_SECRET as string

  if (authHeader) {
    const token = authHeader.split(' ')[1]

    try {
      const decoded = (await jwt.verify(token, JWT_SECRET)) as DecodedUser

      request.decodedUser = decoded

      next()
    } catch (error) {
      next(new ForbiddenError('Invalid token!'))
    }
  } else {
    next(new UnauthorizedError('Authorization header missing'))
  }
}

export default verifyJWT

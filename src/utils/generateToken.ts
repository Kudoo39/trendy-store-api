import jwt from 'jsonwebtoken'

import { UserDocument } from '../model/User'

const generateToken = (userData: UserDocument): string => {
  const token = jwt.sign(
    {
      // DO NOT PROVIDE SENSITIVE INFORMATION HERE
      email: userData.email,
      role: userData.role,
      _id: userData._id
    },
    process.env.JWT_SECRET as string,
    {
      expiresIn: '1h'
    }
  )
  return token
}

export default generateToken



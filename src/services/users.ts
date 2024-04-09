import { ConflictError, NotFoundError } from '../errors/ApiError'
import User, { UserDocument } from '../model/User'

// services: async function
// talk to database
// methods: find();
const getAllUsers = async (): Promise<UserDocument[]> => {
  // find: methods by mongoose
  try {
    return await User.find()
  } catch (error) {
    throw new Error('Failed to fetch users from the database')
  }
}

const createUser = async (user: UserDocument): Promise<UserDocument> => {
  const existingUser = await User.findOne({ email: user.email })
  if (existingUser) {
    throw new ConflictError('Email address already exists')
  }
  try {
    return await user.save()
  } catch (error) {
    throw new Error('Failed to create user')
  }
}

const updateUser = async (userId: string, userData: Partial<UserDocument>): Promise<UserDocument | null> => {
  try {
    const { firstname, lastname, email, password } = userData;

    const updatedData: Partial<UserDocument> = {};
    if (firstname) updatedData.firstname = firstname;
    if (lastname) updatedData.lastname = lastname;
    if (email) updatedData.email = email;
    if (password) updatedData.password = password;

    return await User.findByIdAndUpdate(userId, updatedData, { new: true })
  } catch (error) {
    throw new NotFoundError()
  }
}

const changePassword = async (email: string, newPassword: string): Promise<UserDocument | null> => {
  try {    
    const foundUser = await User.findOne({ email });

    if (!foundUser) {
      throw new NotFoundError('User not found');
    }

    foundUser.password = newPassword;

    await foundUser.save();
    return foundUser;
  } catch (error) {
    throw new NotFoundError('Invalid user!')
  }
}

const deleteUser = async (userId: string): Promise<boolean> => {
  try {
    const deletedUser = await User.findByIdAndDelete(userId)
    return !!deletedUser
  } catch (error) {
    throw new NotFoundError()
  }
}

const getUserByEmail = async (email: string): Promise<UserDocument> => {
  const foundUser = await User.findOne({ email })
  if (foundUser) {
    return foundUser
  }
  throw new NotFoundError('This email is not existed!')
}

export default { getAllUsers, createUser, updateUser, changePassword, deleteUser, getUserByEmail }

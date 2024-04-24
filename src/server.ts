/* eslint-disable no-console */
import mongoose from 'mongoose'

import app from './app'

const MONGODB_URL = process.env.MONGODB_URL as string
const PORT = process.env.PORT as string

mongoose
  .connect(MONGODB_URL, {
    dbName: 'e-commerce'
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log('Database is connected')
      console.log(`Server is running on http://localhost:${PORT}`)
    })
  })
  .catch((error: Error) => {
    console.log('MongDB connection error' + error)
    process.exit(1)
  })

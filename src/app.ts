import express, { Request, Response } from 'express'
import dotenv from 'dotenv'
import cors from 'cors'

import productsRouter from './routers/productsRouter'
import usersRouter from './routers/usersRouter'
import categoriesRouter from './routers/categoriesRouter'
import ordersRouter from './routers/ordersRouter'
import apiErrorhandler from './middlewares/apiErrorhandler'

const app = express()
app.use(cors())
app.use(express.json())

dotenv.config({ path: '.env' })

app.get('/', (request: Request, response: Response) => {
  response.status(200).json({ message: 'Hello world!' })
})

app.use('/api/v1/products', productsRouter)
app.use('/api/v1/users', usersRouter)
app.use('/api/v1/categories', categoriesRouter)
app.use('/api/v1/orders', ordersRouter)

app.use(apiErrorhandler)

export default app

import { Router } from 'express'
import { bookRouter } from './BookRoutes'

const routes = Router()

routes.use('/books', bookRouter)

export { routes }

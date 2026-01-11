import { Router } from 'express'
import { BookController } from '../controllers/BookController'

const bookRouter = Router()
const bookController = new BookController()

bookRouter.post('/', bookController.create)
bookRouter.get('/', bookController.index)
bookRouter.get('/:id', bookController.show)
bookRouter.patch('/:id', bookController.update)

export { bookRouter }

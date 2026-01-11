import { Router } from 'express'
import { BookController } from '../controllers/BookController'
import { upload } from '../config/upload'

const bookRouter = Router()
const bookController = new BookController()

bookRouter.post('/', upload.single('image'), bookController.create)
bookRouter.get('/', bookController.index)
bookRouter.get('/:id', bookController.show)
bookRouter.patch('/:id', upload.single('image'), bookController.update)
bookRouter.delete('/:id', bookController.delete)

export { bookRouter }

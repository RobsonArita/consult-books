import { NextFunction, Request, Response } from 'express'
import { BookRepository } from '../repositories/BookRepository'
import { BookService } from '../services/BookService'
import { CreateBookDTO, UpdateBookDTO } from '../types/BookDTO'
import { deleteFileByUrl } from '../config/upload'
import { globals } from '../config/globals'

export class BookController {
  private readonly bookService: BookService

  constructor(bookRepository: BookRepository = new BookRepository()) {
    this.bookService = new BookService(bookRepository)
  }

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const file = req.file

      const dto: CreateBookDTO = {
        author: req.body?.author,
        title: req.body?.title,
        description: req.body?.description,
        publishedDate: req.body?.publishedDate,
        image: file ? `${globals.URL}/files/${file.filename}` : ''
      }

      const book = await this.bookService.create(dto)
      return res.status(201).json(book.toJSON())
    } catch (err) {
      if (req.file?.filename) deleteFileByUrl(`/files/${req.file.filename}`)
      next(err)
    }
  }

  index = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const name = req.query?.name?.toString()
      const books = await this.bookService.index(name)
      return res.status(200).json(books)
    } catch (err) {
      next(err)
    }
  }

  show = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params?.id?.toString()
      const book = await this.bookService.show(id)
      return res.status(200).json(book)
    } catch (err) {
      next(err)
    }
  }

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params?.id?.toString()

      const file = req.file

      const dto: UpdateBookDTO = {
        author: req.body?.author,
        title: req.body?.title,
        description: req.body?.description,
        publishedDate: req.body?.publishedDate
      }

      if (file) {
        dto.image = `${globals.URL}/files/${file.filename}`
      }

      const updatedBook = await this.bookService.update(id, dto)
      return res.status(200).json(updatedBook)
    } catch (err) {
      next(err)
    }
  }

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params?.id?.toString()
      await this.bookService.delete(id)
      return res.status(200).json({ message: 'Book deleted successfully' })
    } catch (err) {
      next(err)
    }
  }
}

import { NextFunction, Request, Response } from 'express'
import { BookRepository } from '../repositories/BookRepository'
import { BookService } from '../services/BookService'

export class BookController {
  private readonly bookService: BookService

  constructor(bookRepository: BookRepository = new BookRepository()) {
    this.bookService = new BookService(bookRepository)
  }

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const book = await this.bookService.create(req.body)
      return res.status(201).json(book.toJSON())
    } catch (err) {
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
      const data = req.body
      const updatedBook = await this.bookService.update(id, data)
      return res.status(200).json(updatedBook)
    } catch (err) {
      next(err)
    }
  }

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params?.id?.toString()
      await this.bookService.delete(id)
      return res.status(204).send()
    } catch (err) {
      next(err)
    }
  }
}

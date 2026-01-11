import { BookErrors } from '../errors/BookErrors'
import { IBook } from '../models/Book'
import { BookRepository } from '../repositories/BookRepository'
import { CreateBookDTO, UpdateBookDTO } from '../types/BookDTO'
import { QueryFilter, Types, UpdateQuery } from 'mongoose'

export class BookService {
  private readonly bookRepository: BookRepository

  private readonly bookErrors

  constructor(bookRepository: BookRepository = new BookRepository()) {
    this.bookRepository = bookRepository

    this.bookErrors = new BookErrors()
  }

  public create = async (data: CreateBookDTO) => {
    this.validateCreateBookData(data)

    const createdBook = await this.bookRepository.create(data)
    return createdBook
  }

  public validateCreateBookData = (data: CreateBookDTO) => {
    if (!data.title) throw this.bookErrors.validationFailed('Title is required', { title: data.title })
    if (!data.author) throw this.bookErrors.validationFailed('Author is required', { author: data.author })
    if (!data.publishedDate && typeof data.publishedDate !== 'string')
      throw this.bookErrors.validationFailed('Published Date is required', { publishedDate: data.publishedDate })
    if (!data.imageUrl) throw this.bookErrors.validationFailed('Image URL is required', { imageUrl: data.imageUrl })
    if (!data.description) throw this.bookErrors.validationFailed('Description is required', { description: data.description })

    if (!(typeof data.title === 'string')) throw this.bookErrors.validationFailed('Title must be a string', { title: data.title })
    if (!(typeof data.author === 'string')) throw this.bookErrors.validationFailed('Author must be a string', { author: data.author })
    if (isNaN(new Date(data.publishedDate).getTime()))
      throw this.bookErrors.validationFailed('Published Date must be a Date', { publishedDate: data.publishedDate })
    if (!(typeof data.imageUrl === 'string')) throw this.bookErrors.validationFailed('Image URL must be a string', { imageUrl: data.imageUrl })
    if (!(typeof data.description === 'string'))
      throw this.bookErrors.validationFailed('Description must be a string', { description: data.description })
  }

  public index = async (search?: string) => {
    const match: QueryFilter<IBook> = {}

    if (search) {
      this.validateSearch(search)
      match.$or = [{ title: { $regex: search, $options: 'i' } }, { author: { $regex: search, $options: 'i' } }]
    }

    const books = await this.bookRepository.findAll(match).select({ title: 1, description: 1, imageUrl: 1 }).lean()
    return books
  }

  public validateSearch = (search: string) => {
    if (typeof search !== 'string') throw this.bookErrors.validationFailed('Search must be a string', { search })
  }

  public show = async (id?: string) => {
    this.validateId(id)

    const book = await this.bookRepository.findById(new Types.ObjectId(id)).lean()
    if (!book) {
      throw this.bookErrors.notFound('Book not found', { id })
    }

    return book
  }

  public validateId = (id?: string) => {
    if (!id || !Types.ObjectId.isValid(id)) throw this.bookErrors.validationFailed('Invalid id', { id })
  }

  public update = async (id: string, data: UpdateBookDTO) => {
    this.validateId(id)
    this.validateUpdateBookData(data)

    const update: UpdateQuery<IBook> = { $set: data }
    const updatedBook = await this.bookRepository.updateById(new Types.ObjectId(id), update).lean()
    if (!updatedBook) {
      throw this.bookErrors.notFound('Book not found', { id })
    }

    return updatedBook
  }

  public validateUpdateBookData = (data: UpdateBookDTO) => {
    if (data.title && !(typeof data.title === 'string')) throw this.bookErrors.validationFailed('Title must be a string', { title: data.title })
    if (data.author && !(typeof data.author === 'string')) throw this.bookErrors.validationFailed('Author must be a string', { author: data.author })
    if (data.publishedDate && isNaN(new Date(data.publishedDate).getTime()))
      throw this.bookErrors.validationFailed('Published Date must be a Date', { publishedDate: data.publishedDate })
    if (data.imageUrl && !(typeof data.imageUrl === 'string'))
      throw this.bookErrors.validationFailed('Image URL must be a string', { imageUrl: data.imageUrl })
    if (data.description && !(typeof data.description === 'string'))
      throw this.bookErrors.validationFailed('Description must be a string', { description: data.description })
  }

  public delete = async (id: string) => {
    this.validateId(id)

    const deletedBook = await this.bookRepository.deleteById(new Types.ObjectId(id)).lean()
    if (!deletedBook) {
      throw this.bookErrors.notFound('Book not found', { id })
    }

    return deletedBook
  }
}

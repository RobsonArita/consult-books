import { Model } from 'mongoose'
import { BaseRepository } from './BaseRepository'
import { BookModel, IBook } from '../models/Book'

export class BookRepository extends BaseRepository<IBook> {
  constructor(model: Model<IBook> = BookModel()) {
    super(model)
  }
}

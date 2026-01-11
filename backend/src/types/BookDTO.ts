import { Book, IBook } from '../models/Book'

export interface CreateBookDTO extends IBook {}
export interface UpdateBookDTO extends Partial<IBook> {}

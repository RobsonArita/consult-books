import { Book } from '../types/Book'
import { api } from './api'

export const bookService = {
  async list(): Promise<Book[]> {
    const { data } = await api.get('/books')
    return data
  },

  async getById(id: string): Promise<Book> {
    const { data } = await api.get(`/books/${id}`)
    return data
  },

  async create(data: FormData): Promise<Book> {
    const response = await api.post('/books', data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })

    return response.data
  },

  async update(id: string, book: FormData): Promise<Book> {
    const { data } = await api.patch(`/books/${id}`, book, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    return data
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/books/${id}`)
  }
}

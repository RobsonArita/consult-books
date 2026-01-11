import mongoose from 'mongoose'
import { Request, Response } from 'express'
import { BookRepository } from '../../src/repositories/BookRepository'
import { BookController } from '../../src/controllers/BookController'
import { BookModel } from '../../src/models/Book'

import * as dotenv from 'dotenv'

dotenv.config()

let bookController: BookController
let bookId: string

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI_TEST || '')

  const bookModel = BookModel(mongoose.connection)
  const bookRepo = new BookRepository(bookModel)
  bookController = new BookController(bookRepo)
})

afterAll(async () => {
  if (mongoose.connection.db) {
    await mongoose.connection.db.dropDatabase()
  }
  await mongoose.disconnect()
})

describe('BookController CRUD', () => {
  it('should create a book', async () => {
    const req = {
      body: {
        title: 'Clean Code',
        author: 'Robert C. Martin',
        publishedDate: '2008-08-01',
        description: 'A Handbook of Agile Software Craftsmanship',
        imageUrl: 'http://example.com/cleancode.jpg'
      }
    } as unknown as Request

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    } as unknown as Response

    await bookController.create(req, res, jest.fn())

    expect(res.status).toHaveBeenCalledWith(201)
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ title: 'Clean Code' }))

    const createdBook = (res.json as jest.Mock).mock.calls[0][0]
    bookId = createdBook._id
  })

  it('should list books', async () => {
    const req = { query: {} } as unknown as Request
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    } as unknown as Response

    await bookController.index(req, res, jest.fn())

    expect(res.status).toHaveBeenCalledWith(200)
    const books = (res.json as jest.Mock).mock.calls[0][0]
    expect(books.length).toBe(1)
    expect(books[0]).toHaveProperty('title', 'Clean Code')
  })

  it('should get a book by id', async () => {
    const req = { params: { id: bookId } } as unknown as Request
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    } as unknown as Response

    await bookController.show(req, res, jest.fn())

    expect(res.status).toHaveBeenCalledWith(200)
    const book = (res.json as jest.Mock).mock.calls[0][0]
    expect(book).toHaveProperty('title', 'Clean Code')
  })

  it('should update a book', async () => {
    const req = {
      params: { id: bookId },
      body: { title: 'Clean Code - Updated' }
    } as unknown as Request
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    } as unknown as Response

    await bookController.update(req, res, jest.fn())

    expect(res.status).toHaveBeenCalledWith(200)
    const updatedBook = (res.json as jest.Mock).mock.calls[0][0]
    expect(updatedBook).toHaveProperty('title', 'Clean Code - Updated')
  })

  it('should delete a book', async () => {
    const req = { params: { id: bookId } } as unknown as Request
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn()
    } as unknown as Response

    await bookController.delete(req, res, jest.fn())
    expect(res.status).toHaveBeenCalledWith(204)

    const getReq = { params: { id: bookId } } as unknown as Request
    const getRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    } as unknown as Response

    await expect(bookController.show(getReq, getRes, jest.fn())).resolves.toBe(undefined)
  })
})

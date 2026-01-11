// @ts-nocheck
import 'jest'
import { BookService } from '../../src/services/BookService'
import { BookRepository } from '../../src/repositories/BookRepository'
import { Types } from 'mongoose'

jest.mock('../../src/repositories/BookRepository')

describe('BookService', () => {
  let service: BookService

  beforeEach(() => {
    service = new BookService()
    jest.clearAllMocks()
  })

  describe('create', () => {
    it('should create a book', async () => {
      const repoSpy = jest.spyOn(BookRepository.prototype, 'create').mockResolvedValue({ title: 'Clean Code' } as any)

      const book = await service.create({
        title: 'Clean Code',
        author: 'Robert C. Martin',
        publishedDate: new Date('2008-08-01'),
        description: 'A Handbook of Agile Software Craftsmanship',
        imageUrl: 'http://example.com/cleancode.jpg'
      })

      expect(repoSpy).toHaveBeenCalled()
      expect(book.title).toBe('Clean Code')
    })

    it('should throw error if title is missing', async () => {
      await expect(
        service.create({
          author: 'Robert C. Martin',
          publishedDate: new Date('2008-08-01'),
          description: 'A Handbook of Agile Software Craftsmanship',
          imageUrl: 'http://example.com/cleancode.jpg'
        })
      ).rejects.toThrow('Title is required')
    })

    it('should throw error if publishedDate is invalid', async () => {
      await expect(
        service.create({
          title: 'Clean Code',
          author: 'Robert C. Martin',
          publishedDate: 'invalid-date',
          description: 'A Handbook of Agile Software Craftsmanship',
          imageUrl: 'http://example.com/cleancode.jpg'
        })
      ).rejects.toThrow('Published Date must be a Date')
    })
  })

  describe('index', () => {
    it('should return books without search', async () => {
      const selectMock = jest.fn().mockReturnThis()
      const leanMock = jest.fn().mockResolvedValue([{ title: 'DDD' }])

      jest.spyOn(BookRepository.prototype, 'findAll').mockReturnValue({ select: selectMock, lean: leanMock } as any)

      const books = await service.index()

      expect(books.length).toBe(1)
      expect(books[0].title).toBe('DDD')
    })

    it('should apply search filter', async () => {
      const selectMock = jest.fn().mockReturnThis()
      const leanMock = jest.fn().mockResolvedValue([])

      const findAllSpy = jest.spyOn(BookRepository.prototype, 'findAll').mockReturnValue({ select: selectMock, lean: leanMock } as any)

      await service.index('Clean')

      expect(findAllSpy).toHaveBeenCalledWith({
        $or: [{ title: { $regex: 'Clean', $options: 'i' } }, { author: { $regex: 'Clean', $options: 'i' } }]
      })
    })

    it('should throw error if search is not string', async () => {
      await expect(service.index(123 as any)).rejects.toThrow('Search must be a string')
    })
  })

  describe('show', () => {
    it('should return a book by id', async () => {
      const id = new Types.ObjectId()

      jest.spyOn(BookRepository.prototype, 'findById').mockReturnValue({ lean: jest.fn().mockResolvedValue({ title: 'DDD' }) } as any)

      const book = await service.show(id.toHexString())

      expect(book.title).toBe('DDD')
    })

    it('should throw error if id is invalid', async () => {
      await expect(service.show('invalid-id')).rejects.toThrow('Invalid id')
    })

    it('should throw notFound error if book does not exist', async () => {
      const id = new Types.ObjectId()

      jest.spyOn(BookRepository.prototype, 'findById').mockReturnValue({ lean: jest.fn().mockResolvedValue(null) } as any)

      await expect(service.show(id.toHexString())).rejects.toThrow('Book not found')
    })
  })
})

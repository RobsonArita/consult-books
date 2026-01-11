import { Document, Schema, model } from 'mongoose'

export interface IBook {
  title: string
  author: string
  publishedDate: Date
  image: string
  description: string
}

export interface IBookDocument extends IBook, Document {}

const BookSchema = new Schema<IBookDocument>(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    publishedDate: { type: Date, required: true },
    image: { type: String, required: true },
    description: { type: String, required: true }
  },
  { timestamps: true }
)

export class Book implements IBook {
  title: string
  author: string
  publishedDate: Date
  image: string
  description: string

  constructor(title: string, author: string, publishedDate: Date, image: string, description: string) {
    this.title = title
    this.author = author
    this.publishedDate = publishedDate
    this.image = image
    this.description = description
  }
}

BookSchema.loadClass(Book)
export const BookModel = (connection?: import('mongoose').Connection) => {
  if (!connection) {
    return model<IBookDocument>('Book', BookSchema)
  }
  return connection.model<IBookDocument>('Book', BookSchema)
}

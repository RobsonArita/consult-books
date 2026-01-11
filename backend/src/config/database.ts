import mongoose from 'mongoose'
import { globals } from './globals'

class Database {
  connection: mongoose.Connection | null = null

  public connect = async (options: mongoose.ConnectOptions = {}): Promise<mongoose.Connection> => {
    mongoose.set('strictQuery', false)

    if (this.connection) {
      console.log('Connected to MongoDB', this.connection.name)
      return this.connection
    }

    try {
      const connection = await mongoose.connect(globals.MONGO_URI, options)
      this.connection = connection.connection
      console.log('Connected to MongoDB', this.connection.name)
      return connection.connection
    } catch (error) {
      console.error('MongoDB connection error', error)
      throw error
    }
  }
}

export const database = new Database()

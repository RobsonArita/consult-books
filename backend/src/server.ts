import express from 'express'
import cors from 'cors'
import { globals } from './config/globals'
import { database } from './config/database'
import { routes } from './routes/routes'
import { errorHandler } from './middlewares/errorHandler'
import { notFound } from './middlewares/notFound'

const server = express()
server.use(cors())
server.use(express.json({ limit: '10mb' }))
server.use(express.urlencoded({ extended: true, limit: '10mb' }))

server.use('/files', express.static(globals.UPLOADS_FOLDER))

server.get('/health', (req, res) => {
  return res.status(200).json({ status: 'OK' })
})

server.use('/', routes)
server.use(notFound)
server.use(errorHandler)

const PORT = globals.PORT

const waitForMongo = async (retries = 10, delay = 3000) => {
  for (let i = 0; i < retries; i++) {
    try {
      await database.connect()
      console.log('MongoDB connected')
      return
    } catch (err) {
      console.log(`Mongo not ready, retrying in ${delay}ms... (${i + 1}/${retries})`)
      await new Promise((r) => setTimeout(r, delay))
    }
  }
  throw new Error('MongoDB failed to connect after multiple retries')
}

const startServer = async () => {
  try {
    await waitForMongo()
    server.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`)
    })
  } catch (err) {
    console.error('Failed to start server', err)
    process.exit(1)
  }
}

startServer()

export default server

import * as dotenv from 'dotenv'

dotenv.config()

class Globals {
  readonly PORT: number
  readonly MONGO_URI: string
  readonly UPLOADS_FOLDER: string
  readonly URL: string

  constructor() {
    this.PORT = Number(process.env.PORT) || 3000
    this.MONGO_URI = process.env.MONGO_URI || ''
    this.UPLOADS_FOLDER = '/server/uploads'
    this.URL = process.env.IP ? `http://${process.env.IP}:${this.PORT}` : `http://localhost:${this.PORT}`
  }
}

const globals = new Globals()
export { globals }

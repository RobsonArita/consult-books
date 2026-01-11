import * as dotenv from 'dotenv'

dotenv.config()

class Globals {
  readonly PORT: number
  readonly MONGO_URI: string

  constructor() {
    this.PORT = Number(process.env.PORT) || 3000
    this.MONGO_URI = process.env.MONGO_URI || ''
  }
}

const globals = new Globals()
export { globals }

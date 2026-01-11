import { Request, Response, NextFunction } from 'express'
import { HttpError } from 'http-errors'

export function errorHandler(error: Error | HttpError, _req: Request, res: Response, _next: NextFunction) {
  console.error(error)
  if ('statusCode' in error) {
    return res.status(error.statusCode).json({
      status: 'error',
      message: error.message
    })
  }

  return res.status(500).json({
    status: 'error',
    message: 'Internal server error'
  })
}

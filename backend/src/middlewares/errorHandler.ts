import { Request, Response, NextFunction } from 'express'
import { HttpError } from 'http-errors'

export function errorHandler(error: Error | HttpError, _req: Request, res: Response, _next: NextFunction) {
  console.error(error)

  const status = (error as HttpError).status || (error as any).statusCode

  if (status) {
    return res.status(status).json({
      status: 'error',
      message: error.message,
      data: (error as any).data || {}
    })
  }

  return res.status(500).json({
    status: 'error',
    message: 'Internal server error'
  })
}

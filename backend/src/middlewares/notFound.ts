import createError from 'http-errors'
import { Request, Response, NextFunction } from 'express'

export function notFound(_req: Request, _res: Response, next: NextFunction) {
  next(createError(404, 'Route not found'))
}

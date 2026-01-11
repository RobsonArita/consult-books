import createError from 'http-errors'

export class BookErrors {
  public validationFailed = (message: string, data = {}) => createError(400, `Validation failed: ${message}`, data)
  public notFound = (message: string, data = {}) => createError(404, `Not Found: ${message}`, data)
}

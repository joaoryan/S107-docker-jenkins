import { HttpResponse } from '../protocols'
import { ServerError, UnauthorizedError } from '../errors'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: error
})

export const unauthorized = (): HttpResponse => ({
  statusCode: 401,
  body: new UnauthorizedError()
})

export const serverError = (error: Error): HttpResponse => ({
  statusCode: 500,
  body: new ServerError(error.stack)
})

export const ok = (data: any): HttpResponse => ({
  statusCode: 200,
  body: data
})

export const forbidden = (error: Error): HttpResponse => ({
  statusCode: 403,
  body: error
})

export const noContent = (): HttpResponse => ({
  statusCode: 204,
  body: null
})

export const created = <T = any>(data: T): HttpResponse<T> => ({
  statusCode: 201,
  body: data
})

export const download = (path: string, file?: {filePath: string, folderPath: string}): HttpResponse => ({
  statusCode: 200,
  body: null,
  download: path,
  file
})

export const notFound = (resource: { name: string; value: string | number }): HttpResponse => ({
  statusCode: 404,
  body: new ResourceNotFoundError(resource)
})

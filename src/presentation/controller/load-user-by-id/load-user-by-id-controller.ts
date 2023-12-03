import { LoadUserById } from '../../../domain/usecases/load-user-by-id'
import { ServerError } from '../../errors'
import { badRequest, noContent, ok, serverError } from '../../helpers/http-helper'
import { Controller, HttpRequest, HttpResponse, Validation } from '../../protocols'

export class LoadUserByIdController implements Controller {
  private readonly loadUserById: LoadUserById

  constructor(loadUserById: LoadUserById) {
    this.loadUserById = loadUserById
  }

  async handle(httpRequest: HttpRequest<LoadUserById.Request>): Promise<HttpResponse<LoadUserById.Response>> {
    try {
      const response = await this.loadUserById.load()
      if (!response) return noContent()
      return ok(response)
    } catch (error) {
      return serverError(new ServerError(error.stack))
    }
  }
}

import { LoadUserById } from '../../../domain/usecases/load-user-by-id'
import { ServerError } from '../../errors'
import { badRequest, noContent, ok, serverError } from '../../helpers/http-helper'
import { Controller, HttpRequest, HttpResponse, Validation } from '../../protocols'

export class LoadUserByIdController implements Controller {
  private readonly loadUserById: LoadUserById
  private readonly validation: Validation

  constructor(loadUserById: LoadUserById, validation: Validation) {
    this.loadUserById = loadUserById
    this.validation = validation
  }

  async handle(httpRequest: HttpRequest<LoadUserById.Request>): Promise<HttpResponse<LoadUserById.Response>> {
    try {
      const validationError = this.validation.validate(httpRequest.params)
      if (validationError) return badRequest(validationError)
      const response = await this.loadUserById.load(httpRequest.params.id)
      if (!response) return noContent()
      return ok(response)
    } catch (error) {
      return serverError(new ServerError(error.stack))
    }
  }
}

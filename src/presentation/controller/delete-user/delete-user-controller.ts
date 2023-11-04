
import { DeleteUser } from '../../../domain/usecases/delete-user'
import { MissingParamError, ServerError } from '../../errors'
import { NoRowsAffected } from '../../errors/no-rows-affected-error'
import { badRequest, ok, serverError } from '../../helpers/http-helper'
import { Controller, HttpRequest, HttpResponse, Validation } from '../../protocols'

export class DeleteUserController implements Controller {
  private readonly paramsValidation: Validation
  private readonly dbDeleteUser: DeleteUser
  constructor(paramsValidation: Validation, dbDeleteUser: DeleteUser) {
    this.paramsValidation = paramsValidation
    this.dbDeleteUser = dbDeleteUser
  }

  async handle(httpRequest: HttpRequest<DeleteUser.Request>): Promise<HttpResponse> {
    try {
      if (!httpRequest.params.id) return badRequest(new MissingParamError('id'))
      const validationError = this.paramsValidation.validate(httpRequest.params)
      if (validationError) return badRequest(new MissingParamError('id'))
      const deleteIsOk = await this.dbDeleteUser.delete(httpRequest.params.id)
      if (!deleteIsOk) return badRequest(new NoRowsAffected(httpRequest.params.id))
      return ok({})
    } catch (error) {
      return serverError(new ServerError(error.stack))
    }
  }
}

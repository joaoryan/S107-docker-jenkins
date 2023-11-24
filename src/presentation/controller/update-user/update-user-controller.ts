import { forbidden, ok, serverError } from '../../helpers/http-helper'
import { UpdateUser } from '../../../domain/usecases/update-user'
import { Controller, HttpRequest, HttpResponse, Validation } from '../../protocols'
import { badRequest } from '../../helpers/http-helper'
import { MissingParamError, ServerError } from '../../errors'
import { NoRowsAffected } from '../../errors/no-rows-affected-error'

export class UpdateUserController implements Controller {
  private readonly paramsValidation: Validation
  private readonly bodyValidation: Validation
  private readonly dbUpdateUser: UpdateUser
  constructor(paramsValidation: Validation, bodyValidation: Validation, dbUpdateUser: UpdateUser) {
    this.paramsValidation = paramsValidation
    this.bodyValidation = bodyValidation
    this.dbUpdateUser = dbUpdateUser
  }

  async handle(httpRequest: HttpRequest<UpdateUser.Request>): Promise<HttpResponse> {
    try {
      if (!httpRequest.body) return badRequest(new MissingParamError('user'))
      if (!httpRequest.params.id) return badRequest(new MissingParamError('id'))
      const validationParamsError = this.paramsValidation.validate(httpRequest.params)
      const validationBodyError = this.bodyValidation.validate(httpRequest.body)
      if (validationParamsError) return badRequest(validationParamsError)
      if (validationBodyError) return badRequest(validationBodyError)

      const result = await this.dbUpdateUser.update(httpRequest.params.id, httpRequest.body)
      if (!result) return badRequest(new NoRowsAffected(httpRequest.params.id))
      return ok({})
    } catch (error) {
      return serverError(new ServerError(error))
    }
  }
}

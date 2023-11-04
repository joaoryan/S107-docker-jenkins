import { AddUser } from '../../../domain/usecases/add-user'
import { badRequest, serverError, created, forbidden } from '../../helpers/http-helper'
import { Controller, HttpRequest, HttpResponse, Validation } from '../../protocols'
import { UserCreationError } from '../../errors/user-creation-error'

export class AddUserController implements Controller {
  private readonly validation: Validation
  private readonly addUser: AddUser

  constructor(validation: Validation, addUser: AddUser) {
    this.validation = validation
    this.addUser = addUser
  }

  async handle(httpRequest: HttpRequest<AddUser.Request>): Promise<HttpResponse<AddUser.Response>> {
    try {
      if (!httpRequest.body) return badRequest(new Error())

      const requestUser = httpRequest.body
      const validationError = this.validation.validate(requestUser)
      if (validationError) return badRequest(validationError)

      const user = await this.addUser.add(requestUser)
      return created<AddUser.Response>(user)
    } catch (error) {
      return serverError(new UserCreationError())
    }
  }
}

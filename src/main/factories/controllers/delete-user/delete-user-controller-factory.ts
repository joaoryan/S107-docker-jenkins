import { Controller } from '../../../../presentation/protocols'
import { ControllerDecorator } from '../../../decorators/log-controller-decorator'
import { DeleteUserController } from '../../../../presentation/controller/delete-user/delete-user-controller'
import { makeDeleteUserValidation } from './delete-user-validation-factory'
import { makeDbDeleteUser } from '../../usecases/delete-user/db-delete-user-factory'

export const makeDeleteUserController = (): Controller => {
  const deleteUserController = new DeleteUserController(makeDeleteUserValidation(), makeDbDeleteUser())
  return new ControllerDecorator(deleteUserController)
}

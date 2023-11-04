import { Controller } from '../../../../presentation/protocols'
import { makeAddUserValidation } from './add-user-validation-factory'
import { makeDbAddUser } from '../../usecases/add-user/db-add-user-factory'
import { AddUserController } from '../../../../presentation/controller/add-user/add-user-controller'
import { ControllerDecorator } from '../../../decorators/log-controller-decorator'

export const makeAddUserController = (): Controller => {
  const addUserController = new AddUserController(makeAddUserValidation(), makeDbAddUser())

  return new ControllerDecorator(addUserController)
}

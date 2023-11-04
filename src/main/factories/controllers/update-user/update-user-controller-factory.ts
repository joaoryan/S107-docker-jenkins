import { Controller } from '../../../../presentation/protocols'
import { makeUpdateUserBodyValidation } from './update-user-body-validation-factory'
import { makeUpdateUserParamsValidation } from './update-user-params-validation-factory'
import { makeDbUpdateUser } from '../../usecases/update-user/db-update-user-factory'
import { UpdateUserController } from '../../../../presentation/controller/update-user/update-user-controller'
import { ControllerDecorator } from '../../../decorators/log-controller-decorator'

export const makeUpdateUserController = (): Controller => {
  const updateUserController = new UpdateUserController(makeUpdateUserParamsValidation(), makeUpdateUserBodyValidation(), makeDbUpdateUser())
  return new ControllerDecorator(updateUserController)
}

import { LoadUserByIdController } from '../../../../presentation/controller/load-user-by-id/load-user-by-id-controller'
import { Controller } from '../../../../presentation/protocols'
import { ControllerDecorator } from '../../../decorators/log-controller-decorator'
import { makeDbLoadUserById } from '../../usecases/load-user/db-load-user-by-id'
import { makeLoadUserByIdValidation } from './load-user-by-id-validation-factory'

export const makeLoadUserByIdController = (): Controller => {
  const loadUserByIdController = new LoadUserByIdController(makeDbLoadUserById(), makeLoadUserByIdValidation())
  return new ControllerDecorator(loadUserByIdController)
}

import { UserMySqlRepository } from '../../../../infra/user/user-mysql-repository'
import { DbUpdateUser } from '../../../../data/usecases/update-user/db-update-user'
import { UpdateUser } from '../../../../domain/usecases/update-user'

export const makeDbUpdateUser = (): UpdateUser => {
  const repository = new UserMySqlRepository()
  return new DbUpdateUser(repository)
}

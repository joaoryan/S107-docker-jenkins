import { DbDeleteUser } from '../../../../data/usecases/delete-user/db-delete-user'
import { DeleteUser } from '../../../../domain/usecases/delete-user'
import { UserMySqlRepository } from '../../../../infra/user/user-mysql-repository'

export const makeDbDeleteUser = (): DeleteUser => {
  const repository = new UserMySqlRepository()
  return new DbDeleteUser(repository)
}

import { UserMySqlRepository } from '../../../../infra/user/user-mysql-repository'
import { DbAddUser } from '../../../../data/usecases/add-user/db-add-user'
import { AddUser } from '../../../../domain/usecases/add-user'

export const makeDbAddUser = (): AddUser => {
  const repository = new UserMySqlRepository()
  return new DbAddUser(repository)
}

import { UserMongoRepository } from '../../../../infra/mongodb/user-mongo-repository'
import { DbAddUser } from '../../../../data/usecases/add-user/db-add-user'
import { AddUser } from '../../../../domain/usecases/add-user'

export const makeDbAddUser = (): AddUser => {
  const repository = new UserMongoRepository()
  return new DbAddUser(repository)
}

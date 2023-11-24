import { DbDeleteUser } from '../../../../data/usecases/delete-user/db-delete-user'
import { DeleteUser } from '../../../../domain/usecases/delete-user'
import { UserMongoRepository } from '../../../../infra/mongodb/user-mongo-repository'

export const makeDbDeleteUser = (): DeleteUser => {
  const repository = new UserMongoRepository()
  return new DbDeleteUser(repository)
}

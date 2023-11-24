import { UserMongoRepository } from '../../../../infra/mongodb/user-mongo-repository'
import { DbUpdateUser } from '../../../../data/usecases/update-user/db-update-user'
import { UpdateUser } from '../../../../domain/usecases/update-user'

export const makeDbUpdateUser = (): UpdateUser => {
  const repository = new UserMongoRepository()
  return new DbUpdateUser(repository)
}

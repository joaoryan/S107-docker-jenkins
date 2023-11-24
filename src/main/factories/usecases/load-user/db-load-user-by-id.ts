import { UserMongoRepository } from '../../../../infra/mongodb/user-mongo-repository'
import { DbLoadUserById } from '../../../../data/usecases/load-user-by-id/db-load-user-by-id'

export const makeDbLoadUserById = (): DbLoadUserById => {
  const loadUserByRepository = new UserMongoRepository()
  return new DbLoadUserById(loadUserByRepository)
}

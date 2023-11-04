import { UserMySqlRepository } from '../../../../infra/user/user-mysql-repository'
import { DbLoadUserById } from '../../../../data/usecases/load-user-by-id/db-load-user-by-id'

export const makeDbLoadUserById = (): DbLoadUserById => {
  const loadUserByRepository = new UserMySqlRepository()
  return new DbLoadUserById(loadUserByRepository)
}

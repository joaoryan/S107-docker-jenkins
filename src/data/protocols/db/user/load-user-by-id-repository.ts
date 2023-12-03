import { UserModel } from '../../../../domain/models/user'
import { LoadUserById } from '../../../../domain/usecases/load-user-by-id'

export interface LoadUserByIdRepository {
  loadUser: () => Promise<UserModel[] | null>
}

// eslint-disable-next-line no-redeclare
export namespace LoadUserByIdRepository {
  export type Result = LoadUserById.Response
}

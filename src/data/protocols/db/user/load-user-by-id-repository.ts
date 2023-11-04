import { UserModel } from '../../../../domain/models/user'
import { LoadUserById } from '../../../../domain/usecases/load-user-by-id'

export interface LoadUserByIdRepository {
  loadUserById: (id: number) => Promise<UserModel[] | null>
}

// eslint-disable-next-line no-redeclare
export namespace LoadUserByIdRepository {
  export type Result = LoadUserById.Response
}

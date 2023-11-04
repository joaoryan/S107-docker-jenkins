import { UpdateUserModel } from "../../../../domain/models/user"


export interface UpdateUserRepository {
  updateUser(id: number, user: UpdateUserRepository.Parameter): Promise<boolean>
}

// eslint-disable-next-line no-redeclare
export namespace UpdateUserRepository {
  export type Parameter = UpdateUserModel
}

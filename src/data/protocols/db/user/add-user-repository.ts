import { CreateUserOvenModel, UserModel } from "../../../../domain/models/user"


export interface AddUserRepository {
  addUser: (userData: AddUserRepository.Parameter) => Promise<AddUserRepository.Result>
}

// eslint-disable-next-line no-redeclare
export namespace AddUserRepository {
  export type Result = UserModel | null
  export type Parameter = CreateUserOvenModel
}

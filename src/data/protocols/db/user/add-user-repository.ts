import { CreateUserOvenModel, UserModel } from "../../../../domain/models/user"


export interface AddUserRepository {
  addUser: (userType: AddUserRepository.Parameter) => Promise<AddUserRepository.Result>
}

// eslint-disable-next-line no-redeclare
export namespace AddUserRepository {
  export type Result = UserModel
  export type Parameter = CreateUserOvenModel
}

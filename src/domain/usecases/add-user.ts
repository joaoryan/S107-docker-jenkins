import { CreateUserOvenModel, UserModel } from '../models/user'

export interface AddUser {
  add(user: CreateUserOvenModel): Promise<UserModel>
}

// eslint-disable-next-line no-redeclare
export namespace AddUser {
  export type Response = UserModel
  export type Request = {
    body: CreateUserOvenModel
  }
}

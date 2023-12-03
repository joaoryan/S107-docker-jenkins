import { UserModel } from '../models/user'

export interface LoadUserById {
  load(): Promise<UserModel[] | null>;
}

// eslint-disable-next-line no-redeclare
export namespace LoadUserById {
  export type Response = UserModel | null
  export type Request = {

  }
}

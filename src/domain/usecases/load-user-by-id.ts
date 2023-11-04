import { UserModel } from '../models/user'

export interface LoadUserById {
  load(id: number): Promise<UserModel[] | null>;
}

// eslint-disable-next-line no-redeclare
export namespace LoadUserById {
  export type Response = UserModel | null
  export type Request = {
    params: {
      id: number
    }
  }
}

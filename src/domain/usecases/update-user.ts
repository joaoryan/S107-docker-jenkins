import { UpdateUserModel } from '../models/user'

export interface UpdateUser {
  update(id: number, user: UpdateUserModel): Promise<boolean>
}

// eslint-disable-next-line no-redeclare
export namespace UpdateUser {
  export type Request = {
    body: UpdateUserModel
    params: { id?: number }
  }
}

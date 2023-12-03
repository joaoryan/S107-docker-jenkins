export interface DeleteUser {
  delete(id: number | string): Promise<boolean>
}

// eslint-disable-next-line no-redeclare
export namespace DeleteUser {
  export type Request = {
    params: { id?: number | string }
  }
}

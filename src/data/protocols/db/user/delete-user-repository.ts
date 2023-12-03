export interface DeleteUserRepository {
  deleteUser(id: number | string): Promise<boolean>
}

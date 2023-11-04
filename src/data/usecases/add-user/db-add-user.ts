import { CreateUserOvenModel, UserModel } from '../../../domain/models/user'
import { AddUser } from '../../../domain/usecases/add-user'
import { AddUserRepository } from '../../protocols/db/user/add-user-repository'

export class DbAddUser implements AddUser {
  private readonly repository: AddUserRepository
  constructor(repository: AddUserRepository) {
    this.repository = repository
  }

  async add(user: CreateUserOvenModel): Promise<UserModel> {
    const userResponse = await this.repository.addUser(user)
    return userResponse
  }
}

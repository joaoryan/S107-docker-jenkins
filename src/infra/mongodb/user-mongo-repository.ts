import { LoadUserByIdRepository } from '../../data/protocols/db/user/load-user-by-id-repository'
import { AddUserRepository } from '../../data/protocols/db/user/add-user-repository'
import { UserModel, UpdateUserModel, CreateUserOvenModel } from '../../domain/models/user'
import { UpdateUserRepository } from '../../data/protocols/db/user/update-user-repository'
import { DeleteUserRepository } from '../../data/protocols/db/user/delete-user-repository'

export class UserMongoRepository implements LoadUserByIdRepository, AddUserRepository, UpdateUserRepository, DeleteUserRepository {

  async loadUserById(id: number): Promise<UserModel[]> {
    console.log('load-> ', id)
    return null
  }

  async addUser(userType: CreateUserOvenModel): Promise<UserModel> {
    console.log('post-> ', userType)
    return null
  }

  async updateUser(id: number, user: UpdateUserModel): Promise<boolean> {
    console.log('put-> ', id, user)
    return true
  }

  async deleteUser(id: number): Promise<boolean> {
    console.log('delete-> ', id)
    return true
  }
}

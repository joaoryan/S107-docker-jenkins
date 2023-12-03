import { LoadUserByIdRepository } from '../../data/protocols/db/user/load-user-by-id-repository'
import { AddUserRepository } from '../../data/protocols/db/user/add-user-repository'
import { UserModel, UpdateUserModel, CreateUserOvenModel } from '../../domain/models/user'
import { UpdateUserRepository } from '../../data/protocols/db/user/update-user-repository'
import { DeleteUserRepository } from '../../data/protocols/db/user/delete-user-repository'
import user from '../../domain/models/task.js'

export class UserMongoRepository implements LoadUserByIdRepository, AddUserRepository, UpdateUserRepository, DeleteUserRepository {

  async loadUserById(id: number): Promise<UserModel[]> {
    const response = await user.find();
    return response
  }

  async addUser(userData: CreateUserOvenModel): Promise<UserModel> {
    const newUser = await user.create(userData);
    return newUser
  }

  async updateUser(id: number, userData: UpdateUserModel): Promise<boolean> {
    const response = await user.findByIdAndUpdate({ "_id": id }, userData);
    console.log(response)
    return true
  }

  async deleteUser(id: number): Promise<boolean> {
    const response = await user.findByIdAndDelete(id);
    console.log(response)
    return true
  }
}

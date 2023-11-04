
import { LoadUserByIdRepository } from '../../data/protocols/db/user/load-user-by-id-repository'
import { AddUserRepository } from '../../data/protocols/db/user/add-user-repository'
import { UserModel, UpdateUserModel, CreateUserOvenModel } from '../../domain/models/user'
import { UpdateUserRepository } from '../../data/protocols/db/user/update-user-repository'
import { DeleteUserRepository } from '../../data/protocols/db/user/delete-user-repository'
import * as fs from 'fs';

export class UserMySqlRepository implements LoadUserByIdRepository, AddUserRepository, UpdateUserRepository, DeleteUserRepository {

  async loadUserById(id: number): Promise<UserModel[] | null> {
    const content = fs.readFileSync('database.json', 'utf8')
    console.log(content)
    return null
  }



  addUser: (userType: CreateUserOvenModel) => Promise<UserModel>
  updateUser(id: number, user: UpdateUserModel): Promise<boolean> {
    throw new Error('Method not implemented.')
  }
  deleteUser: (id: number) => Promise<boolean>

}

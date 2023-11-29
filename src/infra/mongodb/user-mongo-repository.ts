import { LoadUserByIdRepository } from '../../data/protocols/db/user/load-user-by-id-repository'
import { AddUserRepository } from '../../data/protocols/db/user/add-user-repository'
import { UserModel, UpdateUserModel, CreateUserOvenModel } from '../../domain/models/user'
import { UpdateUserRepository } from '../../data/protocols/db/user/update-user-repository'
import { DeleteUserRepository } from '../../data/protocols/db/user/delete-user-repository'
import Task from '../../domain/models/task.js'

export class UserMongoRepository implements LoadUserByIdRepository, AddUserRepository, UpdateUserRepository, DeleteUserRepository {

  async loadUserById(id: number): Promise<UserModel[]> {
    const tasks = await Task.find();
    return tasks
  }

  async addUser(userType: CreateUserOvenModel): Promise<UserModel> {
    const newTask = await Task.create(userType);
    return newTask
  }

  async updateUser(id: number, user: UpdateUserModel): Promise<boolean> {
    await Task.findByIdAndUpdate({ "_id": id },
      {
        "name": user.name,
        "matricula": user.matricula,
        "materia": user.materia,
        "nota": user.nota
      });
    return true
  }

  async deleteUser(id: number): Promise<boolean> {
    await Task.findByIdAndDelete(id);
    return true
  }
}

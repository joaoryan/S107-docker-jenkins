import { LoadUserByIdRepository } from '../../data/protocols/db/user/load-user-by-id-repository'
import { AddUserRepository } from '../../data/protocols/db/user/add-user-repository'
import { UserModel, UpdateUserModel, CreateUserOvenModel } from '../../domain/models/user'
import { UpdateUserRepository } from '../../data/protocols/db/user/update-user-repository'
import { DeleteUserRepository } from '../../data/protocols/db/user/delete-user-repository'
import Task from '../../domain/models/task.js'

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



// async function getTasks (req, res){
//     const tasks = await Task.find();
//     return res.status(200).send(tasks);
// }
// async function createTask( req, res ){
//     const task = req.body;
//     const newTask = await Task.create(task);
//     return res.status(201).send(newTask);
// }
// async function deleteTask( req, res ){
//     const id = req.params.id;
//     await Task.findByIdAndDelete(id);
//     return res.status(200).send('Task excluida com sucesso!');
// }
// async function updateTask( req, res ){
//     const id = req.params.id
//     const status = req.body.status;
//     const description = req.body.description;
//     const task = await Task.findByIdAndUpdate({"_id": id}, {"status": status, "description": description});
//     return res.status(200).send('Task atualizada com sucesso!');
// }

// export { getTasks, createTask, deleteTask, updateTask};
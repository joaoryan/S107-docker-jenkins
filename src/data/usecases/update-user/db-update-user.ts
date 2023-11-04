import { UpdateUser } from '../../../domain/usecases/update-user'
import { UpdateUserRepository } from '../../protocols/db/user/update-user-repository'

export class DbUpdateUser implements UpdateUser {
  private readonly repository: UpdateUserRepository
  constructor(repository: UpdateUserRepository) {
    this.repository = repository
  }

  async update(id: number, user: any): Promise<boolean> {
    return await this.repository.updateUser(id, user)
  }
}

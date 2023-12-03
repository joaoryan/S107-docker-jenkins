import { UserModel } from '../../../domain/models/user'
import { LoadUserById } from '../../../domain/usecases/load-user-by-id'
import { LoadUserByIdRepository } from '../../protocols/db/user/load-user-by-id-repository'

export class DbLoadUserById implements LoadUserById {
  private readonly repository: LoadUserByIdRepository
  constructor(repository: LoadUserByIdRepository) {
    this.repository = repository
  }

  async load(): Promise<UserModel[] | null> {
    return await this.repository.loadUser()
  }
}

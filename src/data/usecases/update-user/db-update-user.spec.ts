import { describe, test, expect, jest } from '@jest/globals'
import { DbUpdateUser } from './db-update-user'
import { UpdateUserRepository } from '../../protocols/db/user/update-user-repository'
import { mockUpdateUserRequest } from '../../../domain/mocks/user/index'
import { UpdateUser } from '../../../domain/usecases/update-user'

class UpdateUserRepositoryStub implements UpdateUserRepository {
  async updateUser(id: number, user: UpdateUserRepository.Parameter): Promise<boolean> {
    return true
  }
}

type SutTypes = {
  sut: UpdateUser
  repositoryStub: UpdateUserRepository
}

const makeSut = (): SutTypes => {
  const repositoryStub = new UpdateUserRepositoryStub()
  const sut = new DbUpdateUser(repositoryStub)
  return {
    sut,
    repositoryStub
  }
}

describe('Testing the DbUpdateUser class', () => {
  describe('Dependency with UpdateUserRepository class', () => {
    test('should call the updateUser method only once', async () => {
      const { sut, repositoryStub } = makeSut()
      const repositorySpy = jest.spyOn(repositoryStub, 'updateUser')
      const { body, params } = mockUpdateUserRequest(1)
      await sut.update(params.id!, body.user!)
      expect(repositorySpy).toHaveBeenCalledTimes(1)
    })
    test('should call the updateUser method with the correct parameter', async () => {
      const { sut, repositoryStub } = makeSut()
      const repositorySpy = jest.spyOn(repositoryStub, 'updateUser')
      const { body, params } = mockUpdateUserRequest(1)
      await sut.update(params.id!, body.user!)
      expect(repositorySpy).toHaveBeenCalledWith(params.id!, body.user!)
    })
    test('should return true if the updateUser method returns true', async () => {
      const { sut } = makeSut()
      const { body, params } = mockUpdateUserRequest(1)
      const result = await sut.update(params.id!, body.user!)
      expect(result).toBeTruthy()
    })
    test('should return false if the updateUser method returns false', async () => {
      const { sut, repositoryStub } = makeSut()
      jest.spyOn(repositoryStub, 'updateUser').mockResolvedValue(false)
      const { body, params } = mockUpdateUserRequest(1)
      const result = await sut.update(params.id!, body.user!)
      expect(result).toBeFalsy()
    })
    test('should throw an exception if the updateUser method fails', async () => {
      const { sut, repositoryStub } = makeSut()
      jest.spyOn(repositoryStub, 'updateUser').mockRejectedValue(new Error())
      const { body, params } = mockUpdateUserRequest(1)
      await expect(sut.update(params.id!, body.user!)).rejects.toThrow()
    })
  })
})

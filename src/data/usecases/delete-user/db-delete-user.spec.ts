import { describe, test, expect, jest } from '@jest/globals'
import { DeleteUserRepository } from './../../protocols/db/user/delete-user-repository'
import { DbDeleteUser } from './db-delete-user'

class RepositoryStub implements DeleteUserRepository {
  async deleteUser(id: number): Promise<boolean> {
    return true
  }
}

type SutTypes = {
  sut: DbDeleteUser
  repositoryStub: DeleteUserRepository
}

const makeSut = (): SutTypes => {
  const repositoryStub = new RepositoryStub()
  const sut = new DbDeleteUser(repositoryStub)
  return { sut, repositoryStub }
}

describe('Testing the DbDeleteUser class', () => {
  test('should call the deleteUser method with the correct parameter', async () => {
    const { sut, repositoryStub } = makeSut()
    const repositorySpy = jest.spyOn(repositoryStub, 'deleteUser')
    await sut.delete(1)
    expect(repositorySpy).toHaveBeenCalledWith(1)
  })
  test('should return false if deleteUser returns false', async () => {
    const { sut, repositoryStub } = makeSut()
    jest.spyOn(repositoryStub, 'deleteUser').mockResolvedValue(false)
    const result = await sut.delete(1)
    expect(result).toBeFalsy()
  })
  test('should throw an exception if the deleteUser method fails', async () => {
    const { sut, repositoryStub } = makeSut()
    jest.spyOn(repositoryStub, 'deleteUser').mockRejectedValue(new Error())
    await expect(sut.delete(1)).rejects.toThrow()
  })
})

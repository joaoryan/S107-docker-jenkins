import { describe, test, expect, jest } from '@jest/globals'
import { LoadUserByIdRepository } from '../../protocols/db/user/load-user-by-id-repository'
import { mockLoadUserByIdResponse, mockLoadUserBySerialNumberResponse } from '../../../domain/mocks/user'
import { DbLoadUserById } from './db-load-user-by-id'
import { UserModel } from '../../../domain/models/user'

class LoadUserByIdRepositoryStub implements LoadUserByIdRepository {
  async loadUserById(id: number): Promise<UserModel[] | null> {
    return [mockLoadUserBySerialNumberResponse()]
  }
}

type SutTypes = {
  sut: DbLoadUserById
  loadUserByIdRepositoryStub: LoadUserByIdRepositoryStub
}

const makeSut = (): SutTypes => {
  const loadUserByIdRepositoryStub = new LoadUserByIdRepositoryStub()
  const sut = new DbLoadUserById(loadUserByIdRepositoryStub)
  return {
    sut,
    loadUserByIdRepositoryStub
  }
}

describe('Testing the LoadUserById class', () => {
  test('should call the loadUserById method with the correct parameter', async () => {
    const { sut, loadUserByIdRepositoryStub } = makeSut()
    const loadUserByIdRepositorySpy = jest.spyOn(loadUserByIdRepositoryStub, 'loadUserById')
    await sut.load(1)
    expect(loadUserByIdRepositorySpy).toHaveBeenCalledWith(1)
  })
  test('should return a user in case of success', async () => {
    const { sut } = makeSut()
    const user = await sut.load(1)
    expect(user).toEqual([mockLoadUserByIdResponse()])
  })
  test('should throw an exception if the loadUserById method fails', async () => {
    const { sut, loadUserByIdRepositoryStub } = makeSut()
    jest.spyOn(loadUserByIdRepositoryStub, 'loadUserById').mockRejectedValue(new Error())
    await expect(sut.load(1)).rejects.toThrow()
  })
})

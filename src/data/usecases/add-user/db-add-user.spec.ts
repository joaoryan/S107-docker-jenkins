import { describe, test, expect, jest } from '@jest/globals'
import { DbAddUser } from './db-add-user'
import { AddUserRepository } from '../../protocols/db/user/add-user-repository'
import { mockAddUserRequest, mockAddUserResponse } from './../../../domain/mocks/user/index'

class AddUserRepositoryStub implements AddUserRepository {
  async addUser(user: AddUserRepository.Parameter): Promise<AddUserRepository.Result> {
    return mockAddUserResponse()
  }
}

type SutTypes = {
  sut: DbAddUser
  addUserRepositoryStub: AddUserRepositoryStub
}

const makeSut = (): SutTypes => {
  const addUserRepositoryStub = new AddUserRepositoryStub()

  const sut = new DbAddUser(addUserRepositoryStub)
  return {
    sut,
    addUserRepositoryStub
  }
}

describe('Testing the DbAddUser class', () => {
  test('should call the addUser method with the correct parameter', async () => {
    const { sut, addUserRepositoryStub } = makeSut()
    const addUserRepositorySpy = jest.spyOn(addUserRepositoryStub, 'addUser')
    const user = mockAddUserRequest()
    await sut.add(user.body)
    expect(addUserRepositorySpy).toHaveBeenCalledWith(user.body)
  })
  test('should return a new user in case of success', async () => {
    const { sut } = makeSut()
    const user = mockAddUserRequest()
    const userResponse = await sut.add(user.body)
    expect(userResponse).toEqual(mockAddUserResponse())
  })
  test('should throw an exception if the addUser method fails', async () => {
    const { sut, addUserRepositoryStub } = makeSut()
    jest.spyOn(addUserRepositoryStub, 'addUser').mockRejectedValue(new Error())
    const user = mockAddUserRequest()
    await expect(sut.add(user.body)).rejects.toThrow()
  })
})

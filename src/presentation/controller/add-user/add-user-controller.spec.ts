import { describe, test, expect, jest } from '@jest/globals'
import { AddUserController } from './add-user-controller'
import { CreateUserOvenModel, UserModel } from '../../../domain/models/user'
import { AddUser } from '../../../domain/usecases/add-user'
import { Validation } from '../../protocols'
import { badRequest, created, serverError } from '../../helpers/http-helper'
import { mockAddUserRequest, mockAddUserResponse } from '../../../domain/mocks/user'

class ValidationStub implements Validation {
  validate(input: any): Error | null {
    return null
  }
}

class DbAddUserStub implements AddUser {
  async add(user: CreateUserOvenModel): Promise<UserModel> {
    return mockAddUserResponse()
  }
}

interface SutTypes {
  sut: AddUserController
  validationStub: Validation
  dbAddUserStub: AddUser
}

const makeSut = (): SutTypes => {
  const validationStub = new ValidationStub()
  const dbAddUserStub = new DbAddUserStub()
  const sut = new AddUserController(validationStub, dbAddUserStub)
  return {
    sut,
    validationStub,
    dbAddUserStub
  }
}

describe('Testing the AddUserController class', () => {
  describe('Dependency with Validator class', () => {
    test('should call the validate method only once', async () => {
      const { sut, validationStub } = makeSut()
      const validateSpy = jest.spyOn(validationStub, 'validate')
      const httpRequest = mockAddUserRequest()
      await sut.handle(httpRequest)
      expect(validateSpy).toHaveBeenCalledTimes(1)
    })
    test('should call the validate method with the correct parameter', async () => {
      const { sut, validationStub } = makeSut()
      const validateSpy = jest.spyOn(validationStub, 'validate')
      const httpRequest = mockAddUserRequest()
      await sut.handle(httpRequest)
      expect(validateSpy).toHaveBeenCalledWith(httpRequest.body)
    })
    test('should return 201 if the validate method returns null', async () => {
      const { sut } = makeSut()
      const httpResponse = await sut.handle(mockAddUserRequest())
      expect(httpResponse).toEqual(created<AddUser.Response>(httpResponse.body))
    })
    test('should return 400 if the validate returns error', async () => {
      const { sut, validationStub } = makeSut()
      jest.spyOn(validationStub, 'validate').mockReturnValue(new Error())
      const httpResponse = await sut.handle(mockAddUserRequest())
      expect(httpResponse).toEqual(badRequest(new Error()))
    })
  })
  describe('Dependency with DbAddUser class', () => {
    test('should call the add method only once', async () => {
      const { sut, dbAddUserStub } = makeSut()
      const dbAddUserSpy = jest.spyOn(dbAddUserStub, 'add')
      const httpRequest = mockAddUserRequest()
      await sut.handle(httpRequest)
      expect(dbAddUserSpy).toHaveBeenCalledTimes(1)
    })
    test('should call the add method with the correct parameter', async () => {
      const { sut, dbAddUserStub } = makeSut()
      const dbAddUserSpy = jest.spyOn(dbAddUserStub, 'add')
      const httpRequest = mockAddUserRequest()
      await sut.handle(httpRequest)
      expect(dbAddUserSpy).toHaveBeenCalledWith(httpRequest.body)
    })
    test('should return 201 if the add method returns an object ', async () => {
      const { sut } = makeSut()
      const httpResponse = await sut.handle(mockAddUserRequest())
      expect(httpResponse).toEqual(created(httpResponse.body))
    })
    test('should return 500 if the add method throws', async () => {
      const { sut, dbAddUserStub } = makeSut()
      jest.spyOn(dbAddUserStub, 'add').mockRejectedValue(new Error())
      const httpResponse = await sut.handle(mockAddUserRequest())
      expect(httpResponse).toEqual(serverError(new Error()))
    })
  })
})

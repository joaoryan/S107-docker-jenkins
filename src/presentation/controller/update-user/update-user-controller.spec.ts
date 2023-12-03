import { describe, test, expect, jest, afterEach } from '@jest/globals'
import { UpdateUserController } from './update-user-controller'
import { UpdateUser } from '../../../domain/usecases/update-user'
import { Validation } from '../../protocols'
import { mockUpdateUserRequest } from '../../../domain/mocks/user'
import { ok } from '../../helpers/http-helper'
import { UpdateUserModel } from './../../../domain/models/user'

class ValidationStub implements Validation {
  validate(input: any): Error | null {
    return null
  }
}

class DbUpdateUserStub implements UpdateUser {
  async update(id: number | string, user: UpdateUserModel): Promise<boolean> {
    return true
  }
}

interface SutTypes {
  sut: UpdateUserController
  paramsValidationStub: Validation
  bodyValidationStub: Validation
  dbUpdateUserStub: UpdateUser
}

const makeSut = (): SutTypes => {
  const paramsValidationStub = new ValidationStub()
  const bodyValidationStub = new ValidationStub()
  const dbUpdateUserStub = new DbUpdateUserStub()
  const sut = new UpdateUserController(paramsValidationStub, bodyValidationStub, dbUpdateUserStub)
  return {
    sut,
    paramsValidationStub,
    bodyValidationStub,
    dbUpdateUserStub
  }
}

describe('Testing the UpdateUserController class', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('Dependency with ParamsValidator class', () => {
    test('should call the validate method with the correct parameter', async () => {
      const { sut, paramsValidationStub } = makeSut()
      const validateSpy = jest.spyOn(paramsValidationStub, 'validate')
      const httpRequest = mockUpdateUserRequest(1)
      await sut.handle(httpRequest)
      expect(validateSpy).toHaveBeenCalledWith(httpRequest.params)
    })
  })

  describe('Dependency with BodyValidator class', () => {
    test('should call the validate method with the correct parameter', async () => {
      const { sut, bodyValidationStub } = makeSut()
      const validateSpy = jest.spyOn(bodyValidationStub, 'validate')
      const httpRequest = mockUpdateUserRequest(1)
      await sut.handle(httpRequest)
      expect(validateSpy).toHaveBeenCalledWith(httpRequest.body)
    })
  })

  describe('Dependency with DbUpdateUser class', () => {
    test('should call the Update method with the correct parameter', async () => {
      const { sut, dbUpdateUserStub } = makeSut()
      const dbUpdateUserSpy = jest.spyOn(dbUpdateUserStub, 'update')
      const httpRequest = mockUpdateUserRequest(1)
      await sut.handle(httpRequest)
      expect(dbUpdateUserSpy).toHaveBeenCalledWith(httpRequest.params.id, httpRequest.body)
    })
    test('should return 200 if the Update method returns true ', async () => {
      const { sut } = makeSut()
      const httpResponse = await sut.handle(mockUpdateUserRequest(1))
      expect(httpResponse).toEqual(ok({}))
    })
  })
})

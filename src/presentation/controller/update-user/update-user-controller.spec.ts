import { describe, test, expect, jest, afterEach } from '@jest/globals'
import { UpdateUserController } from './update-user-controller'
import { UpdateUser } from '../../../domain/usecases/update-user'
import { Validation } from '../../protocols'
import { mockUserModel, mockUpdateUserRequest } from '../../../domain/mocks/user'
import { badRequest, ok, serverError } from '../../helpers/http-helper'
import { UserModel, UpdateUserModel } from './../../../domain/models/user'
import { MissingParamError } from '../../errors'
import { NoRowsAffected } from './../../errors/no-rows-affected-error'

class ValidationStub implements Validation {
  validate(input: any): Error | null {
    return null
  }
}

class DbUpdateUserStub implements UpdateUser {
  async update(id: number, user: UpdateUserModel): Promise<boolean> {
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
    test('should call the validate method only once', async () => {
      const { sut, paramsValidationStub } = makeSut()
      const validateSpy = jest.spyOn(paramsValidationStub, 'validate')
      const httpRequest = mockUpdateUserRequest(1)
      await sut.handle(httpRequest)
      expect(validateSpy).toHaveBeenCalledTimes(1)
    })
    test('should call the validate method with the correct parameter', async () => {
      const { sut, paramsValidationStub } = makeSut()
      const validateSpy = jest.spyOn(paramsValidationStub, 'validate')
      const httpRequest = mockUpdateUserRequest(1)
      await sut.handle(httpRequest)
      expect(validateSpy).toHaveBeenCalledWith(httpRequest.params)
    })
    test('should return 200 if the validate method returns null', async () => {
      const { sut } = makeSut()
      const httpResponse = await sut.handle(mockUpdateUserRequest(1))
      expect(httpResponse).toEqual(ok({}))
    })
    test('should return 400 if the validate returns error', async () => {
      const { sut, paramsValidationStub } = makeSut()
      jest.spyOn(paramsValidationStub, 'validate').mockReturnValue(new Error())
      const httpResponse = await sut.handle(mockUpdateUserRequest(1))
      expect(httpResponse).toEqual(badRequest(new Error()))
    })
  })
  describe('Dependency with BodyValidator class', () => {
    test('should call the validate method only once', async () => {
      const { sut, bodyValidationStub } = makeSut()
      const validateSpy = jest.spyOn(bodyValidationStub, 'validate')
      const httpRequest = mockUpdateUserRequest(1)
      await sut.handle(httpRequest)
      expect(validateSpy).toHaveBeenCalledTimes(1)
    })
    test('should call the validate method with the correct parameter', async () => {
      const { sut, bodyValidationStub } = makeSut()
      const validateSpy = jest.spyOn(bodyValidationStub, 'validate')
      const httpRequest = mockUpdateUserRequest(1)
      await sut.handle(httpRequest)
      expect(validateSpy).toHaveBeenCalledWith(httpRequest.body.user)
    })
    test('should return 200 if the validate method returns null', async () => {
      const { sut } = makeSut()
      const httpResponse = await sut.handle(mockUpdateUserRequest(1))
      expect(httpResponse).toEqual(ok({}))
    })
    test('should return 400 if the validate returns error', async () => {
      const { sut, bodyValidationStub } = makeSut()
      jest.spyOn(bodyValidationStub, 'validate').mockReturnValue(new Error())
      const httpResponse = await sut.handle(mockUpdateUserRequest(1))
      expect(httpResponse).toEqual(badRequest(new Error()))
    })
  })
  describe('Dependency with DbUpdateUser class', () => {
    test('should call the Update method only once', async () => {
      const { sut, dbUpdateUserStub } = makeSut()
      const dbUpdateUserSpy = jest.spyOn(dbUpdateUserStub, 'update')
      const httpRequest = mockUpdateUserRequest(1)
      await sut.handle(httpRequest)
      expect(dbUpdateUserSpy).toHaveBeenCalledTimes(1)
    })
    test('should call the Update method with the correct parameter', async () => {
      const { sut, dbUpdateUserStub } = makeSut()
      const dbUpdateUserSpy = jest.spyOn(dbUpdateUserStub, 'update')
      const httpRequest = mockUpdateUserRequest(1)
      await sut.handle(httpRequest)
      expect(dbUpdateUserSpy).toHaveBeenCalledWith(httpRequest.params.id, httpRequest.body.user)
    })
    test('should return 200 if the Update method returns true ', async () => {
      const { sut } = makeSut()
      const httpResponse = await sut.handle(mockUpdateUserRequest(1))
      expect(httpResponse).toEqual(ok({}))
    })
    test('should return 400 if the Update method returns false ', async () => {
      const { sut, dbUpdateUserStub } = makeSut()
      jest.spyOn(dbUpdateUserStub, 'update').mockResolvedValue(false)
      const httpResponse = await sut.handle(mockUpdateUserRequest(1))
      expect(httpResponse).toEqual(badRequest(new NoRowsAffected(1)))
    })
    test('should return 500 if the add method throws', async () => {
      const { sut, dbUpdateUserStub } = makeSut()
      jest.spyOn(dbUpdateUserStub, 'update').mockRejectedValue(new Error())
      const httpResponse = await sut.handle(mockUpdateUserRequest(1))
      expect(httpResponse).toEqual(serverError(new Error()))
    })
    test('should return 400 if the user object is not in the body', async () => {
      const { sut } = makeSut()
      const httpResponse = await sut.handle({ ...mockUpdateUserRequest(1), body: {} })
      expect(httpResponse).toEqual(badRequest(new MissingParamError('user')))
    })
    test('should return 400 if the id parameter is not given', async () => {
      const { sut } = makeSut()
      const httpResponse = await sut.handle({ ...mockUpdateUserRequest(1), params: {} })
      expect(httpResponse).toEqual(badRequest(new MissingParamError('id')))
    })
  })
})

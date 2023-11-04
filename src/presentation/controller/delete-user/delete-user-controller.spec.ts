import { describe, test, expect, jest } from '@jest/globals'
import { Validation } from '../../protocols'
import { DeleteUser } from './../../../domain/usecases/delete-user'
import { DeleteUserController } from './delete-user-controller'
import { mockDeleteUserRequest } from './../../../domain/mocks/user/index'
import { badRequest, ok, serverError } from '../../helpers/http-helper'
import { MissingParamError } from '../../errors'
import { NoRowsAffected } from '../../errors/no-rows-affected-error'

class ValidationStub implements Validation {
  validate(input: { [key: string]: unknown }): Error | null {
    return null
  }
}

class DbDeleteUserStub implements DeleteUser {
  async delete(id: number): Promise<boolean> {
    return true
  }
}

type SutTypes = {
  sut: DeleteUserController
  validationStub: Validation
  dbDeleteUserStub: DeleteUser
}

const makeSut = (): SutTypes => {
  const validationStub = new ValidationStub()
  const dbDeleteUserStub = new DbDeleteUserStub()
  const sut = new DeleteUserController(validationStub, dbDeleteUserStub)
  return { sut, validationStub, dbDeleteUserStub }
}

describe('Testing the DeleteUserController class', () => {
  describe('Dependency with Validator class', () => {
    test('should call the validate method only once', async () => {
      const { sut, validationStub } = makeSut()
      const validateSpy = jest.spyOn(validationStub, 'validate')
      const httpRequest = mockDeleteUserRequest(1)
      await sut.handle(httpRequest)
      expect(validateSpy).toHaveBeenCalledTimes(1)
    })
    test('should call the validate method with the correct parameter', async () => {
      const { sut, validationStub } = makeSut()
      const validateSpy = jest.spyOn(validationStub, 'validate')
      const httpRequest = mockDeleteUserRequest(1)
      await sut.handle(httpRequest)
      expect(validateSpy).toHaveBeenCalledWith(httpRequest.params)
    })
    test('should return 200 if the validate method returns null', async () => {
      const { sut } = makeSut()
      const httpResponse = await sut.handle(mockDeleteUserRequest(1))
      expect(httpResponse).toEqual(ok({}))
    })
    test('should return 400 if the validate returns error', async () => {
      const { sut, validationStub } = makeSut()
      jest.spyOn(validationStub, 'validate').mockReturnValue(new Error())
      const httpResponse = await sut.handle(mockDeleteUserRequest(1))
      expect(httpResponse).toEqual(badRequest(new MissingParamError('id')))
    })
  })
  describe('Dependency with DbDeleteUser class', () => {
    test('should call the delete method only once', async () => {
      const { sut, dbDeleteUserStub } = makeSut()
      const dbDeleteUserSpy = jest.spyOn(dbDeleteUserStub, 'delete')
      const httpRequest = mockDeleteUserRequest(1)
      await sut.handle(httpRequest)
      expect(dbDeleteUserSpy).toHaveBeenCalledTimes(1)
    })
    test('should call the delete method with the correct parameter', async () => {
      const { sut, dbDeleteUserStub } = makeSut()
      const dbDeleteUserSpy = jest.spyOn(dbDeleteUserStub, 'delete')
      const httpRequest = mockDeleteUserRequest(1)
      await sut.handle(httpRequest)
      expect(dbDeleteUserSpy).toHaveBeenCalledWith(httpRequest.params.id)
    })
    test('should return 200 if the delete method returns true ', async () => {
      const { sut } = makeSut()
      const httpResponse = await sut.handle(mockDeleteUserRequest(1))
      expect(httpResponse).toEqual(ok({}))
    })
    test('should return 400 if the delete method returns false ', async () => {
      const { sut, dbDeleteUserStub } = makeSut()
      jest.spyOn(dbDeleteUserStub, 'delete').mockResolvedValue(false)
      const httpResponse = await sut.handle(mockDeleteUserRequest(1))
      expect(httpResponse).toEqual(badRequest(new NoRowsAffected(1)))
    })
    test('should return 500 if the delete method throws', async () => {
      const { sut, dbDeleteUserStub } = makeSut()
      jest.spyOn(dbDeleteUserStub, 'delete').mockRejectedValue(new Error())
      const httpResponse = await sut.handle(mockDeleteUserRequest(1))
      expect(httpResponse).toEqual(serverError(new Error()))
    })
    test('should return 400 if the id is not in the params', async () => {
      const { sut } = makeSut()
      const httpResponse = await sut.handle({ params: {} })
      expect(httpResponse).toEqual(badRequest(new MissingParamError('id')))
    })
  })
})

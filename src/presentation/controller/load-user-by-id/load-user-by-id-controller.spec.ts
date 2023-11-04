import { describe, test, expect, jest, afterEach } from '@jest/globals'
import { mockLoadUserByIdResponse, mockLoadUserByIdRequest, mockLoadUserBySerialNumberResponse } from './../../../domain/mocks/user'
import { LoadUserById } from '../../../domain/usecases/load-user-by-id'
import { LoadUserByIdController } from './load-user-by-id-controller'
import { noContent, ok } from '../../helpers/http-helper'
import { Validation } from '../../protocols'
import { UserModel } from '../../../domain/models/user'

class LoadUserByIdStub implements LoadUserById {
  async load(id: number): Promise<UserModel[] | null> {
    return [mockLoadUserBySerialNumberResponse()]
  }
}

class ValidationStub implements Validation {
  validate(input: any): Error | null {
    return null
  }
}
interface SutTypes {
  sut: LoadUserByIdController
  loadUserByIdStub: LoadUserByIdStub
  validationStub: ValidationStub
}

const makeSut = (): SutTypes => {
  const loadUserByIdStub = new LoadUserByIdStub()
  const validationStub = new ValidationStub()
  const sut = new LoadUserByIdController(loadUserByIdStub, validationStub)

  return { sut, loadUserByIdStub, validationStub }
}

describe('Testing the LoadUserByIdController class', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('Dependency with LoadUserById class', () => {
    test('should call the load method with the correct parameter', async () => {
      const { sut, loadUserByIdStub } = makeSut()
      const loadUserByIdSpy = jest.spyOn(loadUserByIdStub, 'load')
      const httpRequest = mockLoadUserByIdRequest()
      await sut.handle(httpRequest)
      expect(loadUserByIdSpy).toHaveBeenCalledWith(httpRequest.params.id)
    })
    test('should return 200 if the load method returns a user', async () => {
      const { sut } = makeSut()
      const httpResponse = await sut.handle(mockLoadUserByIdRequest())
      expect(httpResponse).toEqual(ok([mockLoadUserByIdResponse()]))
    })
    test('should return 204 if the load method returns null', async () => {
      const { sut, loadUserByIdStub } = makeSut()
      jest.spyOn(loadUserByIdStub, 'load').mockResolvedValue(null)
      const httpResponse = await sut.handle(mockLoadUserByIdRequest())
      expect(httpResponse).toEqual(noContent())
    })
  })

  describe('Dependency with Validator class', () => {
    test('should call the validate method with the correct parameter', async () => {
      const { sut, validationStub } = makeSut()
      const validationSpy = jest.spyOn(validationStub, 'validate')
      const httpRequest = mockLoadUserByIdRequest()
      await sut.handle(httpRequest)
      expect(validationSpy).toHaveBeenCalledWith(httpRequest.params)
    })
  })
})

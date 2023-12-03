import { describe, test, expect, jest, afterEach } from '@jest/globals'
import { mockLoadUserByIdResponse, mockLoadUserByIdRequest, mockLoadUserBySerialNumberResponse } from './../../../domain/mocks/user'
import { LoadUserById } from '../../../domain/usecases/load-user-by-id'
import { LoadUserByIdController } from './load-user-by-id-controller'
import { noContent, ok } from '../../helpers/http-helper'
import { Validation } from '../../protocols'
import { UserModel } from '../../../domain/models/user'

class LoadUserByIdStub implements LoadUserById {
  async load(): Promise<UserModel[] | null> {
    return [mockLoadUserBySerialNumberResponse()]
  }
}

interface SutTypes {
  sut: LoadUserByIdController
  loadUserByIdStub: LoadUserByIdStub
}

const makeSut = (): SutTypes => {
  const loadUserByIdStub = new LoadUserByIdStub()
  const sut = new LoadUserByIdController(loadUserByIdStub)

  return { sut, loadUserByIdStub }
}

describe('Testing the LoadUserByIdController class', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('Dependency with LoadUserById class', () => {

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
})

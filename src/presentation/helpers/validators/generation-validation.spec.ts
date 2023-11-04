import { InvalidParamError } from '../../errors'
import { GenerationValidation } from './generation-validation'
import { describe, test, expect } from '@jest/globals'

const makeSut = (): GenerationValidation => {
  return new GenerationValidation()
}

describe('RequiredField Validations', () => {
  test('should return an error when the value is an invalid string', () => {
    const sut = makeSut()
    const error = sut.validate({ generation: 'anyString' })
    expect(error).toEqual(new InvalidParamError('generation'))
  })
  test('should return an error when the value is a number', () => {
    const sut = makeSut()
    const error = sut.validate({ generation: 1 })
    expect(error).toEqual(new InvalidParamError('generation'))
  })
  test('should return error when the prop name is invalid', () => {
    const sut = makeSut()
    const error = sut.validate({ any: 'anyString' })
    expect(error).toEqual(new InvalidParamError('generation'))
  })

  test('Should return never if validation succeeds ("A")', () => {
    const sut = makeSut()
    const error = sut.validate({ generation: 'A' })
    expect(error).toBeFalsy()
  })
  test('Should return never if validation succeeds ("B")', () => {
    const sut = makeSut()
    const error = sut.validate({ generation: 'B' })
    expect(error).toBeFalsy()
  })
})

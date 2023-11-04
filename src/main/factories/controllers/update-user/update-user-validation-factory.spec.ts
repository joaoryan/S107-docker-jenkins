import { describe, test, expect, jest } from '@jest/globals'
import { RequiredFieldValidaton } from '../../../../presentation/helpers/validators/required-field-validation'
import { ValidationComposite } from '../../../../presentation/helpers/validators/validator-composite'
import { Validation } from '../../../../presentation/protocols'
import { makeUpdateUserBodyValidation } from './update-user-body-validation-factory'
import { makeUpdateUserParamsValidation } from './update-user-params-validation-factory'
import { NumericFieldValidation } from '../../../../presentation/helpers/validators/numeric-fields-validation'
import { RequiredUpdateFieldValidaton } from '../../../../presentation/helpers/validators/required-update-field-validation'

jest.mock('../../../../presentation/helpers/validators/validator-composite')

describe('UpdateUserValidation Factory', () => {
  describe('Params validation factory', () => {
    test('Should call ValidationComposite with all validations', () => {
      makeUpdateUserParamsValidation()
      const validations: Validation[] = []
      const fields = ['id']
      for (const field of fields) {
        validations.push(new RequiredFieldValidaton(field))
        validations.push(new NumericFieldValidation(field))
      }
      expect(ValidationComposite).toHaveBeenCalledWith(validations)
    })
  })
  describe('Body validation factory', () => {
    test('Should call ValidationComposite with all validations', () => {
      makeUpdateUserBodyValidation()
      const validations: Validation[] = []
      validations.push(new RequiredUpdateFieldValidaton())
      expect(ValidationComposite).toHaveBeenCalledWith(validations)
    })
  })
})

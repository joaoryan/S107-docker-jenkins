import { describe, test, expect, jest } from '@jest/globals'
import { RequiredFieldValidaton } from '../../../../presentation/helpers/validators/required-field-validation'
import { ValidationComposite } from '../../../../presentation/helpers/validators/validator-composite'
import { Validation } from '../../../../presentation/protocols'
import { makeDeleteUserValidation } from './delete-user-validation-factory'
import { NumericFieldValidation } from '../../../../presentation/helpers/validators/numeric-fields-validation'

jest.mock('../../../../presentation/helpers/validators/validator-composite')

describe('AddGroupValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeDeleteUserValidation()
    const validations: Validation[] = []
    const fields = ['id']
    for (const field of fields) {
      validations.push(new RequiredFieldValidaton(field))
      validations.push(new NumericFieldValidation(field))
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})

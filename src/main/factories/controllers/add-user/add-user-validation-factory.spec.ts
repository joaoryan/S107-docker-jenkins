import { describe, test, expect, jest } from '@jest/globals'
import { RequiredFieldValidaton } from '../../../../presentation/helpers/validators/required-field-validation'
import { ValidationComposite } from '../../../../presentation/helpers/validators/validator-composite'
import { Validation } from '../../../../presentation/protocols'
import { makeAddUserValidation } from './add-user-validation-factory'

jest.mock('../../../../presentation/helpers/validators/validator-composite')

describe('AddUserValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeAddUserValidation()
    const validations: Validation[] = []
    const fields = ['idUser', 'typeUser', 'dataUpdate', 'appUpdate', 'serialNumber', 'softwareVersion', 'powerVersion']
    for (const field of fields) {
      validations.push(new RequiredFieldValidaton(field))
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})

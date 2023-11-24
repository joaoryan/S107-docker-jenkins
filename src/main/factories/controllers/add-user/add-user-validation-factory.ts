import { Validation } from '../../../../presentation/protocols'
import { ValidationComposite } from '../../../../presentation/helpers/validators/validator-composite'
import { RequiredFieldValidaton } from '../../../../presentation/helpers/validators/required-field-validation'

export const makeAddUserValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  const fields = [
    'name',
    'matricula',
    'materia',
    'nota'
  ]
  for (const field of fields) {
    validations.push(new RequiredFieldValidaton(field))
  }
  return new ValidationComposite(validations)
}

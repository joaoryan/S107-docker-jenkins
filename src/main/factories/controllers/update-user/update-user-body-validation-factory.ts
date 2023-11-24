import { Validation } from '../../../../presentation/protocols'
import { ValidationComposite } from '../../../../presentation/helpers/validators/validator-composite'
import { RequiredUpdateFieldValidaton } from '../../../../presentation/helpers/validators/required-update-field-validation'

export const makeUpdateUserBodyValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  const fields = [
    'name',
    'matricula',
    'materia',
    'nota'
  ]
  for (const field of fields) {
    validations.push(new RequiredUpdateFieldValidaton())
  }
  return new ValidationComposite(validations)
}

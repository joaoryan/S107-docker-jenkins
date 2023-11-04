import { InvalidParamError } from '../../errors'
import { Validation } from '../../protocols'

export class GenerationValidation implements Validation {
  validate (input: any): Error {
    const generation = input.generation
    if (typeof generation === 'string' && (generation === 'A' || generation === 'B')) return null
    else return new InvalidParamError('generation')
  }
}

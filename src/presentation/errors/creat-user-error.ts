export class CreateUserError extends Error {
  constructor () {
    super('Error creating user')
    this.name = 'CreateUserError'
  }
}

export class UserCreationError extends Error {
  constructor() {
    super('User creation error.')
    this.name = 'UserCreationError'
  }
}

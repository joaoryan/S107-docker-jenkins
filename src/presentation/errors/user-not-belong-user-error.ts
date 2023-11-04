export class UserNotBelongUser extends Error {
  constructor() {
    super('User does not belong to the user')
    this.name = 'UserNotBelongUser'
  }
}
